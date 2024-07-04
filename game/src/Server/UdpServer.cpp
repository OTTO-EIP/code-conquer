// UdpServer.cpp
#include "UdpServer.hpp"

UdpServer::UdpServer(int port) : port(port), running(true) {
    // Creating socket file descriptor
    if ((sockfd = socket(AF_INET, SOCK_DGRAM, 0)) < 0) {
        perror("socket creation failed");
        exit(EXIT_FAILURE);
    }

    memset(&servaddr, 0, sizeof(servaddr));

    // Filling server information
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = INADDR_ANY;
    servaddr.sin_port = htons(port);

    // Bind the socket with the server address
    if (bind(sockfd, (const struct sockaddr *)&servaddr, sizeof(servaddr)) < 0) {
        perror("bind failed");
        close(sockfd);
        exit(EXIT_FAILURE);
    }
}

UdpServer::~UdpServer() {
    running = false;
    close(sockfd);
    for (auto &thread : clientThreads) {
        if (thread.joinable()) {
            thread.join();
        }
    }
}

void UdpServer::handleClient(int clientSock, struct sockaddr_in cliaddr) {
    char buffer[BUFFER_SIZE];
    int len = sizeof(cliaddr);
    while (running) {
        int n = recvfrom(clientSock, (char *)buffer, BUFFER_SIZE, MSG_WAITALL, (struct sockaddr *)&cliaddr, (socklen_t *)&len);
        if (n > 0) {
            buffer[n] = '\0';
            printf("Client: %s\n", buffer);
            sendto(clientSock, (const char *)"Hello from server", strlen("Hello from server"), MSG_CONFIRM, (const struct sockaddr *)&cliaddr, len);
            printf("Hello message sent.\n");
        }
    }
}

void UdpServer::start() {
    while (running) {
        struct sockaddr_in cliaddr;
        memset(&cliaddr, 0, sizeof(cliaddr));
        handleClient(sockfd, cliaddr);
    }
}

int main(int ac, char** av) {
    if (ac < 1)
        return 84;
    UdpServer *_server = new UdpServer(std::stoi(av[1]));
    _server->start();
}

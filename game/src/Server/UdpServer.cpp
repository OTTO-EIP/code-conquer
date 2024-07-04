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
    if (clientThread.joinable()) {
        clientThread.join();
    }
}

void UdpServer::handleClient() {
    char buffer[BUFFER_SIZE];
    struct sockaddr_in cliaddr;
    int len = sizeof(cliaddr);

    while (running) {
        int n = recvfrom(sockfd, (char *)buffer, BUFFER_SIZE, MSG_WAITALL, (struct sockaddr *)&cliaddr, (socklen_t *)&len);
        if (n > 0) {
            buffer[n] = '\0';
            printf("Client: %s\n", buffer);

            // Add the client to the list of clients
            {
                std::lock_guard<std::mutex> lock(clientsMutex);
                clients.insert(cliaddr);
            }

            // Broadcast the message to all clients
            broadcastMessage(buffer, n, cliaddr);
        }
    }
}



void UdpServer::broadcastMessage(const char* message, int length, struct sockaddr_in senderAddr) {
    std::lock_guard<std::mutex> lock(clientsMutex);

    for (const auto& client : clients) {
        if (client.sin_addr.s_addr != senderAddr.sin_addr.s_addr || client.sin_port != senderAddr.sin_port) {
            sendto(sockfd, message, length, MSG_CONFIRM, (const struct sockaddr *)&client, sizeof(client));
        }
    }
    printf("Message broadcasted.\n");
}

void UdpServer::start() {
    clientThread = std::thread(&UdpServer::handleClient, this);
    clientThread.join();
}

int main(int argc, char** argv) {
    if (argc < 2) {
        std::cerr << "Usage: " << argv[0] << " <port>" << std::endl;
        return 1;
    }

    int port = std::stoi(argv[1]);
    UdpServer server(port);
    server.start();

    return 0;
}

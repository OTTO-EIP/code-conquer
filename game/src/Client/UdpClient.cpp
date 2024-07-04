// UdpClient.cpp
#include "UdpClient.hpp"

UdpClient::UdpClient(const std::string &serverAddress, int port) : serverAddress(serverAddress), port(port), running(true) {
    // Creating socket file descriptor
    if ((sockfd = socket(AF_INET, SOCK_DGRAM, 0)) < 0) {
        perror("socket creation failed");
        exit(EXIT_FAILURE);
    }

    memset(&servaddr, 0, sizeof(servaddr));

    // Filling server information
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(port);
    servaddr.sin_addr.s_addr = inet_addr(serverAddress.c_str());
}

UdpClient::~UdpClient() {
    running = false;
    close(sockfd);
    if (sendThread.joinable()) {
        sendThread.join();
    }
    if (receiveThread.joinable()) {
        receiveThread.join();
    }
}

void UdpClient::sendMessages() {
    std::string message;
    while (running) {
        std::getline(std::cin, message);
        if (message == "quit") {
            running = false;
            break;
        }
        sendto(sockfd, message.c_str(), message.size(), MSG_CONFIRM, (const struct sockaddr *)&servaddr, sizeof(servaddr));
        printf("Message sent: %s\n", message.c_str());
    }
}

void UdpClient::receiveMessages() {
    char buffer[BUFFER_SIZE];
    int len = sizeof(servaddr);
    while (running) {
        int n = recvfrom(sockfd, (char *)buffer, BUFFER_SIZE, MSG_WAITALL, (struct sockaddr *)&servaddr, (socklen_t *)&len);
        if (n > 0) {
            buffer[n] = '\0';
            printf("Server: %s\n", buffer);
        }
    }
}

void UdpClient::start() {
    sendThread = std::thread(&UdpClient::sendMessages, this);
    receiveThread = std::thread(&UdpClient::receiveMessages, this);
    sendThread.join();
    receiveThread.join();
}

int main(int ac, char** av) {
    if (ac < 1)
        return 84;
    UdpClient *_client = new UdpClient(av[1], std::stoi(av[2]));
    _client->start();
}

// UdpServer.h
#ifndef UDPSERVER_H
#define UDPSERVER_H

#include <iostream>
#include <cstring>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <thread>
#include <vector>
#include <atomic>

#define BUFFER_SIZE 1024

class UdpServer {
public:
    UdpServer(int port);
    ~UdpServer();
    void start();

private:
    void handleClient(int clientSock, struct sockaddr_in cliaddr);
    int sockfd;
    struct sockaddr_in servaddr;
    int port;
    std::vector<std::thread> clientThreads;
    std::atomic<bool> running;
};

#endif // UDPSERVER_H

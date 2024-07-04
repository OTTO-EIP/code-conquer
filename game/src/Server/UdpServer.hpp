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
#include <mutex>
#include <set>

#define BUFFER_SIZE 1024

struct sockaddr_in_comparator {
    bool operator()(const struct sockaddr_in& lhs, const struct sockaddr_in& rhs) const {
        if (lhs.sin_addr.s_addr < rhs.sin_addr.s_addr) return true;
        if (lhs.sin_addr.s_addr > rhs.sin_addr.s_addr) return false;
        return lhs.sin_port < rhs.sin_port;
    }
};

class UdpServer {
public:
    UdpServer(int port);
    ~UdpServer();
    void start();

private:
    void handleClient();
    void broadcastMessage(const char* message, int length, struct sockaddr_in senderAddr);

    int sockfd;
    struct sockaddr_in servaddr;
    int port;
    std::thread clientThread;
    std::atomic<bool> running;
    std::set<struct sockaddr_in, sockaddr_in_comparator> clients;
    std::mutex clientsMutex;
};

#endif // UDPSERVER_H

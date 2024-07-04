// UdpClient.h
#ifndef UDPCLIENT_H
#define UDPCLIENT_H

#include <iostream>
#include <cstring>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <thread>
#include <atomic>
#include "../Map/Map.hpp"
#include "../RayCam/RayCam.hpp"
#include "../Character/Character.hpp"

#define BUFFER_SIZE 1024

class UdpClient {
public:
    UdpClient(const std::string &serverAddress, int port);
    ~UdpClient();
    void start();
    void join();

    Character *_caracter;
    std::thread gameThread;


private:
    void sendMessages();
    void receiveMessages();
    int sockfd;
    struct sockaddr_in servaddr;
    std::string serverAddress;
    int port;
    std::atomic<bool> running;
    std::thread sendThread;
    std::thread receiveThread;

};

#endif // UDPCLIENT_H

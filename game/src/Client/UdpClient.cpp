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
    std::string greeting = "Hello";
    sendto(sockfd, greeting.c_str(), greeting.size(), 0, (const struct sockaddr *)&servaddr, sizeof(servaddr));
    std::string message;
    while (running) {
        std::getline(std::cin, message);
        if (message == "quit") {
            running = false;

            exit(0);
        }
        sendto(sockfd, message.c_str(), message.size(), 0, (const struct sockaddr *)&servaddr, sizeof(servaddr));
        std::cout << "Message sent: " << message << std::endl;
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

            switch (std::stoi(buffer)) {
                case 0:
                    _caracter->_scarfy = &_caracter->_scarfyURight;
                    break;
                case 1:
                    _caracter->_scarfy = &_caracter->_scarfyDRight;
                    break;
                case 2:
                    _caracter->_scarfy = &_caracter->_scarfyDLeft;
                    break;
                case 3:
                    _caracter->_scarfy = &_caracter->_scarfyULeft;
                    break;
            }

            for (int i = 0; i < 48; i++) {
                _caracter->updateAnimation(18, 12, std::stoi(buffer));
                _caracter->mouvement();
                std::this_thread::sleep_for(std::chrono::milliseconds(30));
            }
        }
    }
}

void UdpClient::start() {
    sendThread = std::thread(&UdpClient::sendMessages, this);
    receiveThread = std::thread(&UdpClient::receiveMessages, this);

}

void UdpClient::join() {
    sendThread.join();
    receiveThread.join();
}


void runGameLoop(UdpClient *client) {
    Raylib raylib;
    Rectangle scene = { 0, 0, 1920, 1080 };
    RayCam camera(raylib.getWindowSize(), scene);
    Rectangle ScreenRect = { 0.0f, 0.0f, (float)camera.getScreenCamera().texture.width, (float)-camera.getScreenCamera().texture.height };
    Map map;
    Entity ground_template("../../assets/map/Tiles/grass_center_E.png", {0, 0});
    client->_caracter = new Character("../../assets/Player/fox1.png", 12);
    map.generateGround(ground_template, raylib);

    SetTargetFPS(60);


     bool inventoryShow = false;

    while (!WindowShouldClose()) {

        Vector2 mousePosition = GetMousePosition();
        Vector2 mouseDelta = GetMouseDelta();
        if (IsMouseButtonDown(MOUSE_BUTTON_RIGHT) || IsMouseButtonDown(MOUSE_BUTTON_LEFT)) {
            camera._camera.target.x -= mouseDelta.x;
            camera._camera.target.y -= mouseDelta.y;

            mousePosition.x += camera.getCamera().target.x;
            mousePosition.y += camera.getCamera().target.y;
        }
        if (CheckCollisionPointRec(mousePosition, client->_caracter->characterRect) && IsMouseButtonPressed(MOUSE_BUTTON_LEFT)) {
            std::cout << "Clicked on character" << std::endl;
            inventoryShow = !inventoryShow;
        }

        BeginTextureMode(camera.getScreenCamera());
            ClearBackground(RAYWHITE);

            BeginMode2D(camera.getCamera());
                map.draw();


                DrawTextureRec(*client->_caracter->_scarfy, client->_caracter->_frameRec, client->_caracter->_position, WHITE);


                //DrawRectangleLinesEx(client->_caracter->characterRect, 3, RED);

            EndMode2D();

        EndTextureMode();

        BeginDrawing();

            ClearBackground(BLACK);
            DrawTextureRec(camera.getScreenCamera().texture, ScreenRect, (Vector2){ 0, 0 }, WHITE);

            if (inventoryShow) {
                Rectangle sourceRec = { 0, 0, (float)client->_caracter->_inventory.width, (float)client->_caracter->_inventory.height };
                Rectangle destRec = { 10, 1080 - (sourceRec.height * 0.3f) - 10, sourceRec.width * 0.3f, sourceRec.height * 0.3f };
                Vector2 origin = { 0, 0 };
                DrawTexturePro(client->_caracter->_inventory, sourceRec, destRec, origin, 0.0f, WHITE);
            }

        EndDrawing();
    }

    CloseWindow();
    // delete client_caracter;
}

int main(int argc, char** argv) {
    if (argc < 2) {
        std::cerr << "Usage: " << argv[0] << " <port>" << std::endl;
        return 1;
    }

    int port = std::stoi(argv[1]);
    std::string serverAddress = "127.0.0.1";


    UdpClient client(serverAddress, port);

    client.start();
    client.gameThread = std::thread(runGameLoop, &client);
    client.join();
    client.gameThread.join();

    return 0;
}

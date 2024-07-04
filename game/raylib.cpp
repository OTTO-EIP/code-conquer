#include "raylib.hpp"

Raylib::Raylib()
{
    _windowName = "Code&Conquer";
    _windowSize = { 1920, 1080 };
    initWindow();

    // Init character 1
    _caracter = new Caracter("fox1.png", 12);
}

Raylib::~Raylib() {}

void Raylib::initWindow()
{
    InitWindow(std::get<0>(_windowSize), std::get<1>(_windowSize), _windowName.c_str());
    SetTargetFPS(60);
}

void Raylib::testLandingPage()
{
    // Mouvement time
     float deltaTime = GetFrameTime();
    _caracter->_elapsedTime += deltaTime;

    // Update
    if (_caracter->_elapsedTime >= _caracter->_changeDirectionTime) {
        _caracter->_elapsedTime = 0.0f;
        _caracter->_direction = std::rand() % 4;
        switch (_caracter->_direction) {
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
    }
    _caracter->updateAnimation(18, 12, _caracter->_direction);
    _caracter->mouvement();

    // Draw
    BeginDrawing();
    ClearBackground(RAYWHITE);

    // Draw character 1
    DrawTextureRec(*_caracter->_scarfy, _caracter->_frameRec, _caracter->_position, WHITE);

    EndDrawing();
}

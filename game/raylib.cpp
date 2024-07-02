#include "raylib.hpp"

Raylib::Raylib()
{
    _windowName = "Code&Conquer";
    _windowSize = { 1920, 1080 };
    initWindow();
}

Raylib::~Raylib() {}

void Raylib::initWindow()
{
    InitWindow(std::get<0>(_windowSize), std::get<1>(_windowSize), _windowName.c_str());
    SetTargetFPS(60);
}

void Raylib::testLandingPage()
{
    const char *text = "Hello, Welcome to Code & Conquer!";
    int fontSize = 20;
    int textWidth = MeasureText(text, fontSize);
    int screenWidth = std::get<0>(_windowSize);
    int screenHeight = std::get<1>(_windowSize);
    int x = (screenWidth - textWidth) / 2;
    int y = (screenHeight - fontSize) / 2;

    BeginDrawing();
    ClearBackground(RAYWHITE);
    DrawText(text, x, y, fontSize, LIGHTGRAY);
    EndDrawing();
}

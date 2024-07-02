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
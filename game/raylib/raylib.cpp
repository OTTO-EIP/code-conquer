#include "raylib.hpp"

Raylib::Raylib()
{
    _windowName = "Code&Conquer";
    _windowSize = { 600, 600 };
    initWindow();
}

Raylib::~Raylib() {}

std::tuple<int, int> Raylib::getWindowSize()
{
    return _windowSize;
}

void Raylib::initWindow()
{
    InitWindow(std::get<0>(_windowSize), std::get<1>(_windowSize), _windowName.c_str());
    SetTargetFPS(60);
}
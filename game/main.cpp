#include "raylib.hpp"

int main(int ac, char **av)
{
    Raylib raylib;
    while (!WindowShouldClose()) {
        raylib.testLandingPage();
    }
    CloseWindow(); 
    return 0;
}
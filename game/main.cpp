#include "raylib.hpp"

int main(int ac, char **av)
{
    Raylib raylib;
    std::srand(std::time(nullptr));

    while (!WindowShouldClose()) {
        raylib.testLandingPage();
    }
    CloseWindow();
    return 0;
}
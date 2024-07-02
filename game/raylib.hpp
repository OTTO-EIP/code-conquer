#pragma once
#include <raylib.h>
#include <iostream>
#include <string>
#include <tuple>

class Raylib {
    public:
        Raylib();
        ~Raylib();
        void testLandingPage();

    private:
        void initWindow();

        std::string _windowName;
        std::tuple<int, int> _windowSize;
};
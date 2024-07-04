#pragma once
#include <raylib.h>
#include <iostream>
#include <string>
#include <tuple>
#include "caracter.hpp"
#include <cstdlib>
#include <ctime>

class Raylib {
    public:
        Raylib();
        ~Raylib();
        
        std::tuple<int, int> getWindowSize();

    private:
        void initWindow();

        std::string _windowName;
        std::tuple<int, int> _windowSize;

        Caracter *_caracter;
};
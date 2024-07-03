#pragma once
#include "../../raylib/raylib.hpp"

class RayCam
{
    public:
        RayCam(std::tuple<int, int> screenSize, Rectangle target);
        ~RayCam();

        RenderTexture getScreenCamera();
        Camera2D getCamera();

        Camera2D _camera;
    private:
        RenderTexture _screenCamera;
};
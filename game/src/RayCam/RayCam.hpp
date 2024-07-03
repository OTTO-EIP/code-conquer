#pragma once
#include "../../raylib/raylib.hpp"

class RayCam
{
    public:
        RayCam(std::tuple<int, int> screenSize, Rectangle target);
        ~RayCam();

        RenderTexture getScreenCamera();
        Camera2D getCamera();

    private:
        Camera2D _camera;
        RenderTexture _screenCamera;
};
#include "RayCam.hpp"


RayCam::RayCam(std::tuple<int, int> screenSize, Rectangle target)
{
    _camera = { 0 };
    _camera.target = (Vector2) { target.x, target.y };
    _camera.offset = (Vector2) { 200.0f, 200.0f };
    _camera.rotation = 0.0f;
    _camera.zoom = 1.0f;

    _screenCamera = LoadRenderTexture(std::get<0>(screenSize), std::get<1>(screenSize));
}

RayCam::~RayCam() {}

RenderTexture RayCam::getScreenCamera()
{
    return _screenCamera;
}

Camera2D RayCam::getCamera()
{
    return _camera;
}

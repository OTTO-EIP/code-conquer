#pragma once
#include "../../raylib/raylib.hpp"

class Entity {

public:
    Entity(std::string path, Vector2 position, float scale);
    ~Entity();

    void draw();
    void setPosition(Vector2 position);
    float getScale();

private:
    Texture2D _texture;
    Vector2 _position;
    float _scale;
    float _rotation;

};

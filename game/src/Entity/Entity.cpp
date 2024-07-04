#include "Entity.hpp"

Entity::Entity(std::string path, Vector2 position, float scale)
{
    _texture = LoadTexture(path.c_str());
    _position = position;
    _scale = scale;
    _rotation = 0.0;
}

Entity::~Entity()
{
}

void Entity::draw()
{
    DrawTextureEx(_texture, _position, _rotation, _scale, WHITE);
}

void Entity::setPosition(Vector2 position)
{
    _position = position;
}

float Entity::getScale()
{
    return _scale;
}
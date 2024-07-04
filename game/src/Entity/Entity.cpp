#include "Entity.hpp"

Entity::Entity(std::string path, Vector2 position)
{
    _texture = LoadTexture(path.c_str());
    _position = position;
    _scale = 0.5;
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
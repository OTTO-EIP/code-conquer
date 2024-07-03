#include "Map.hpp"

Map::Map()
{

}

Map::~Map() {}

std::vector<Entity> Map::getGround()
{
    return _grounds;
}
std::vector<Entity> Map::getFirstLayer()
{
    return _first_layer;
}

void Map::setGround(vector<Entity> grounds)
{
    _grounds = grounds;
}

void Map::setFirstLayer(vector<Entity> first_layer)
{
    _first_layer = first_layer;
}

void Map::addGround(Entity element)
{
    _grounds.push_back(element);
}

void Map::addFirstLayer(Entity element)
{
    _first_layer.push_back(element);
}

void Map::generateGround(Entity __template__, Raylib raylib)
{
    _grounds.clear();
    float tileWidth = 55.0f;
    float tileHeight = 54.0f;
    float halfTileWidth = tileWidth / 2.0f;
    float halfTileHeight = tileHeight / 2.0f;

    for (float height = 0; height < std::get<1>(raylib.getWindowSize()); height += tileHeight) {
        for (float width = 0; width < std::get<0>(raylib.getWindowSize()); width += tileWidth) {
            float x = width - height;
            float y = (width + height) / 2.0f;
            __template__.setPosition({x + halfTileWidth, y - halfTileHeight});
            _grounds.push_back(__template__);
        }
    }
}

void Map::draw()
{
    for (Entity &elem : _grounds) {
        elem.draw();
    }
}
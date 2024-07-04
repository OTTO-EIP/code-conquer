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

    int mapWidth = 100;
    int mapHeight = 100;

    for (int y = 1; y <= mapHeight; y++) {
        for (int x = 1; x <= mapWidth; x++) {

            float hauteur = 60.0f / 2.0f;
            float largeur = 115.0f / 2.0f;

            float posX = (y * largeur) - (x * largeur);
            float posY = (y * hauteur) + (x * hauteur);

            Vector2 pos = {posX, posY};
            __template__.setPosition(pos);
            _grounds.push_back(__template__);
        }
    }
}

void Map::generateFirstLayer(Entity __template__, Entity __template1__, Entity __template2__, Raylib raylib)
{
    std::mt19937 moteur(std::random_device{}());
    std::uniform_int_distribution<> distribution(1, 100);
    std::uniform_int_distribution<> distribution1(1, 3);

    _first_layer.clear();

    int mapWidth = 100;
    int mapHeight = 100;

    int randomPlace;

    for (int y = 0; y < mapHeight; y++) {
        for (int x = 0; x < mapWidth; x++) {
            randomPlace = distribution(moteur);
            if (randomPlace == 3) {
                float hauteur = 60.0f / 2.0f;
                float largeur = 115.0f / 2.0f;

                float posX = (y * largeur) - (x * largeur);
                float posY = (y * hauteur) + (x * hauteur);

                Vector2 pos = {posX, posY};
                int randomBatiment = distribution1(moteur);
                std::cout << randomBatiment << std::endl;
                if (randomBatiment == 1) {
                    __template__.setPosition(pos);
                    _first_layer.push_back(__template__);
                }
                if (randomBatiment == 2) {
                    __template1__.setPosition(pos);
                    _first_layer.push_back(__template1__);
                }
                if (randomBatiment == 3) {
                    __template2__.setPosition(pos);
                    _first_layer.push_back(__template2__);
                }
            }
        }
    }
}

void Map::draw()
{
    for (Entity &elem : _grounds)
        elem.draw();
    for (Entity &elem : _first_layer)
        elem.draw();
}
#pragma once
#include <vector>
#include "../Entity/Entity.hpp"

using namespace std;

class Map {
    public:
        Map();
        ~Map();

        std::vector<Entity> getGround();
        std::vector<Entity> getFirstLayer();

        void addGround(Entity element);
        void setGround(vector<Entity> grounds);
        void generateGround(Entity __template__, Raylib raylib);

        void addFirstLayer(Entity element);
        void setFirstLayer(vector<Entity> first_layer);

        void draw();

    private:
        vector<Entity> _grounds;
        vector<Entity> _first_layer;
};

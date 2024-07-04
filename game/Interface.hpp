#include "raylib.h"
#include <vector>
#include <iostream>
#include "src/RayCam/RayCam.hpp"

class Interface {
public:
    Interface(RayCam *camera_tmp) : iconLoaded(false) {
        iconHouseSelected = false;
        camera = camera_tmp;
        loadAllTexture();

    }
    ~Interface() {
    if (iconLoaded) {
        UnloadTexture(icon); // Décharger la texture si elle est chargée
    }
}

void loadAllTexture() {
    icon = LoadTexture("res/menu.png"); // Charger l'icône depuis un fichier
    iconLoaded = true;
    buildMenu = LoadTexture("res/menu_open.png"); // Charger l'icône depuis un fichier
    buildMenuLoaded = true;
    iconHouse = LoadTexture("assets/map/Tiles/building_door_N.png");
    iconHouseLoaded = true;
    planHouse = LoadTexture("assets/map/Tiles/building_door_N.png");
    planHouseLoaded = true;
}

void OpenMenu() {
    if (IsMouseButtonPressed(MOUSE_LEFT_BUTTON) && !buildMenuOpen) {
        Vector2 mousePosition = GetMousePosition();
        Rectangle hitbox = {vector.x, vector.y, (float)buildMenu.width, (float)buildMenu.height};
        if (CheckCollisionPointRec(mousePosition, hitbox)) {
            buildMenuOpen = true;
        }
    } else if (IsMouseButtonPressed(MOUSE_RIGHT_BUTTON) && buildMenuOpen){
        buildMenuOpen = false;
    }

}

void HouseSelected() {
        Vector2 mousePosition = GetMousePosition();
        Rectangle hitbox = {vectorIconHouse.x, vectorIconHouse.y, (float)iconHouse.width/5, (float)iconHouse.height/5};
        if (CheckCollisionPointRec(mousePosition, hitbox)) {
            if (IsMouseButtonPressed(MOUSE_LEFT_BUTTON) && buildMenuOpen) {
                iconHouseSelected = true;
                buildMenuOpen = false;
            }
    } else if (IsMouseButtonPressed(MOUSE_RIGHT_BUTTON) && iconHouseSelected){
        iconHouseSelected = false;
    }

}

void placeHouse() {
    if (iconHouseSelected) {
        vectorPlanHouse = GetMousePosition();
        float xx = (GetMousePosition().x - planHouse.width/5) + camera->getCamera().target.x;
        float yy = (GetMousePosition().y - planHouse.height/5) + camera->getCamera().target.y;
        auto px = std::to_string(GetMousePosition().x);
        auto py = std::to_string(GetMousePosition().y);
        DrawTextureEx(planHouse, {GetMousePosition().x- planHouse.width/5, GetMousePosition().y - planHouse.height/5}, 0, 0.3, WHITE); // Dessiner l'icône à une position donnée
        if (IsMouseButtonPressed(MOUSE_LEFT_BUTTON)) {
            Texture2D new_house = LoadTexture("assets/map/Tiles/building_door_N.png");
            houses.push_back(new_house);
            Vector2 new_pos;
            new_pos.x = xx;
            new_pos.y = yy;
            houses_pos.push_back(new_pos);
            iconHouseSelected = false;
        }
    }
}

void drawAllHouses() {
    for (int i = 0; i != houses.size(); i++) {
        DrawTextureEx(houses[i], houses_pos[i], 0, 0.3, WHITE);
    }
}

void drawInterface() {
    placeHouse();
    BeginDrawing();
    OpenMenu();
    HouseSelected();
    if (iconLoaded) {
        if (!buildMenuOpen) {
            vector.x = 100;
            vector.y = 700;
            DrawTextureEx(icon, vector, 0, 1.5, WHITE); // Dessiner l'icône à une position donnée
        }
    }
    if (buildMenuLoaded) {
        if (buildMenuOpen == true) {
            vectorMenu.x = 500;
            vectorMenu.y = 50;
            vectorIconHouse.x = 560;
            vectorIconHouse.y = 180;
            DrawTextureEx(buildMenu, vectorMenu, 0, 7, WHITE); // Dessiner l'icône à une position donnée
            // DrawRectangle(vectorIconHouse.x, vectorIconHouse.y, iconHouse.width/5, iconHouse.height/5, RED);
            DrawTextureEx(iconHouse, vectorIconHouse, 0, 0.2, WHITE);
            DrawText("Construction", 590, 140, 30, DARKGRAY);
        }
    }
        if (iconHouseSelected){
            DrawText("Maison Selectionée", 990, 140, 30, DARKGRAY);
        }

        auto px = std::to_string(GetMousePosition().x);
        auto py = std::to_string(GetMousePosition().y);
        // DrawText(px.c_str(), 990, 170, 30, DARKGRAY);
        // DrawText(py.c_str(), 990, 200, 30, DARKGRAY);
        // DrawText(std::to_string(camera->getCamera().target.x).c_str(), 990, 230, 30, DARKGRAY);
        // DrawText(std::to_string(camera->getCamera().target.y).c_str(), 990, 260, 30, DARKGRAY);
    EndDrawing();
}

private:
    // Icon
    Texture2D icon;
    bool iconLoaded;
    Vector2 vector = Vector2();



    // Menu
    Texture2D buildMenu;
    Vector2 vectorMenu = Vector2();
    bool buildMenuOpen;
    bool buildMenuLoaded;

    // Icon in Menu
    Texture2D iconHouse;
    Vector2 vectorIconHouse = Vector2();
    bool iconHouseLoaded;
    bool iconHouseSelected;

    Texture2D planHouse;
    Vector2 vectorPlanHouse = Vector2();
    bool planHouseLoaded;
    bool planHousePlaced;

    std::vector<Texture2D> houses;
    std::vector<Vector2> houses_pos;

    RayCam *camera;

};
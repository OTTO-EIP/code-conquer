#include "src/Map/Map.hpp"
#include "src/RayCam/RayCam.hpp"
#include "src/Character/Character.hpp"
#include <filesystem>
#include <vector>

#define PLAYER_SIZE 40

int main(int ac, char **av)
{
    Raylib raylib;
    Rectangle scene = { 0, 0, 1920, 1080 };
    RayCam camera(raylib.getWindowSize(), scene);
    Rectangle ScreenRect = { 0.0f, 0.0f, (float)camera.getScreenCamera().texture.width, (float)-camera.getScreenCamera().texture.height };
    Map map;
    Entity ground_template("assets/map/Tiles/grass_center_E.png", {0, 0}, 0.5);
    Entity building_template("assets/map/Tiles/building_door_N.png", {0, 0}, 0.5);
    Entity tree_template("assets/map/Tiles/tree_single_E.png", {0, 0}, 0.5);
    Entity multiple_tree_template("assets/map/Tiles/tree_multiple_E.png", {0, 0}, 0.5);
    map.generateGround(ground_template, raylib);
    map.generateFirstLayer(building_template, tree_template, multiple_tree_template, raylib);
    Character *_caracter = new Character("fox1.png", 12);

    SetTargetFPS(60);

    while (!WindowShouldClose()) {

        float deltaTime = GetFrameTime();
        _caracter->_elapsedTime += deltaTime;

        if (_caracter->_elapsedTime >= _caracter->_changeDirectionTime) {
            _caracter->_elapsedTime = 0.0f;
            _caracter->_direction = std::rand() % 4;
            switch (_caracter->_direction) {
                case 0:
                    _caracter->_scarfy = &_caracter->_scarfyURight;
                    break;
                case 1:
                    _caracter->_scarfy = &_caracter->_scarfyDRight;
                    break;
                case 2:
                    _caracter->_scarfy = &_caracter->_scarfyDLeft;
                    break;
                case 3:
                    _caracter->_scarfy = &_caracter->_scarfyULeft;
                    break;
            }
        }
        _caracter->updateAnimation(18, 12, _caracter->_direction);
        _caracter->mouvement();

        if (IsMouseButtonDown(MOUSE_BUTTON_RIGHT) || IsMouseButtonDown(MOUSE_BUTTON_LEFT)) {
            Vector2 mouseDelta = GetMouseDelta();
            camera._camera.target.x -= mouseDelta.x;
            camera._camera.target.y -= mouseDelta.y;
        }
        BeginTextureMode(camera.getScreenCamera());
            ClearBackground(RAYWHITE);
            
            BeginMode2D(camera.getCamera());
                map.draw();
                DrawTextureRec(*_caracter->_scarfy, _caracter->_frameRec, _caracter->_position, WHITE);
            EndMode2D();
            
            
        EndTextureMode();

        BeginDrawing();
            ClearBackground(BLACK);  
            DrawTextureRec(camera.getScreenCamera().texture, ScreenRect, (Vector2){ 0, 0 }, WHITE);
        EndDrawing();
    }
    
    CloseWindow();
    delete _caracter;
    return 0;
}
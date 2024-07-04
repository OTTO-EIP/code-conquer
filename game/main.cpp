#include "src/Map/Map.hpp"
#include "src/RayCam/RayCam.hpp"
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
    Entity ground_template("assets/map/Tiles/grass_center_E.png", {0, 0});
    map.generateGround(ground_template, raylib);

    SetTargetFPS(60);

    while (!WindowShouldClose()) {
        if (IsMouseButtonDown(MOUSE_BUTTON_RIGHT) || IsMouseButtonDown(MOUSE_BUTTON_LEFT)) {
            Vector2 mouseDelta = GetMouseDelta();
            camera._camera.target.x -= mouseDelta.x;
            camera._camera.target.y -= mouseDelta.y;
        }
        BeginTextureMode(camera.getScreenCamera());
            ClearBackground(RAYWHITE);
            
            BeginMode2D(camera.getCamera());
                map.draw();
            EndMode2D();
            
            
        EndTextureMode();

        BeginDrawing();
            ClearBackground(BLACK);  
            DrawTextureRec(camera.getScreenCamera().texture, ScreenRect, (Vector2){ 0, 0 }, WHITE);
        EndDrawing();
    }

    CloseWindow();
    return 0;
}
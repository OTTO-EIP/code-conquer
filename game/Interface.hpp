#include "raylib.h"

class Interface {
public:
    Interface() : iconLoaded(false) {
        // buildMenuOpen = false;
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
}

void OpenMenu() {
    if (IsMouseButtonPressed(MOUSE_LEFT_BUTTON) && !buildMenuOpen) {
        buildMenuOpen = true;
    } else if (IsMouseButtonPressed(MOUSE_LEFT_BUTTON) && buildMenuOpen){
        buildMenuOpen = false;
    }

}

void drawInterface() {
    BeginDrawing();
    OpenMenu();
    if (iconLoaded) {
        if (!buildMenuOpen) {
            Vector2 vector = Vector2();
            vector.x = 100;
            vector.y = 700;
            DrawTextureEx(icon, vector, 0, 1.5, WHITE); // Dessiner l'icône à une position donnée
        }
    }
    if (buildMenuLoaded) {
        if (buildMenuOpen == true) {
            Vector2 vectorMenu = Vector2();
            vectorMenu.x = 500;
            vectorMenu.y = 200;
            DrawText("Construction", 550, 250, 20, DARKGRAY);
            DrawTextureEx(buildMenu, vectorMenu, 0, 5, WHITE); // Dessiner l'icône à une position donnée
        }
    }
    EndDrawing();
}

private:
    // Icon
    Texture2D icon;
    bool iconLoaded;

    // Menu
    Texture2D buildMenu;
    bool buildMenuOpen;
    bool buildMenuLoaded;
};
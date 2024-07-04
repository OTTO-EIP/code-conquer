#include "Interface.hpp"

Interface::Interface() : iconLoaded(false) {
    // Initialiser la fenêtre Raylib
    InitWindow(800, 600, "Interface avec Raylib");
}

Interface::~Interface() {
    if (iconLoaded) {
        UnloadTexture(icon); // Décharger la texture si elle est chargée
    }
    CloseWindow(); // Fermer la fenêtre Raylib
}

void Interface::loadIcon(const char* filePath) {
    icon = LoadTexture(filePath); // Charger l'icône depuis un fichier
    iconLoaded = true;
}

void Interface::drawIcon() {
    if (iconLoaded) {
        DrawTexture(icon, 100, 100, WHITE); // Dessiner l'icône à une position donnée
    }
}
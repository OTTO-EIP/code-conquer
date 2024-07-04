#pragma once
#include "../../raylib/raylib.hpp"

#define MAX_FRAME_SPEED     15
#define MIN_FRAME_SPEED      1

class Character {
    public:
        Character(std::string texturePath, int frameNumber) {
            _scarfyDLeft = LoadTexture("res/fox4.png");
            _scarfyDRight = LoadTexture("res/fox1.png");
            _scarfyULeft = LoadTexture("res/fox3.png");
            _scarfyURight = LoadTexture("res/fox2.png");

            _direction = 1;
            _scarfy = &_scarfyDRight;

            _frameRec = { 0.0f, 0.0f, (float)_scarfy->width / 12, (float)_scarfy->height };
            _position = { (float)(1920 / 2) - (float)(_scarfy->width / frameNumber / 2),
                          (float)(1080 / 2) - (float)(_scarfy->height / 2) };
            _framesSpeed = 18;

        };
        ~Character() {};

        void updateAnimation(int speed, int frameNumber, int direction) {
            _direction =  direction;
            _framesCounter++;
            if (_framesCounter >= (60 / speed))
            {
                _framesCounter = 0;
                _currentFrame++;
                if (_currentFrame > (frameNumber - 1))
                    _currentFrame = 0;
                _frameRec.x = (float) _currentFrame * (float) _scarfy->width / frameNumber;
            }
        };

        void mouvement() {
            switch (_direction) {
                case 0: // Move up-right
                    _position.x += 0.7;
                    _position.y -= 0.3;
                    break;
                case 1: // Move down-right
                    _position.x += 0.7;
                    _position.y += 0.3;
                    break;
                case 2: // Move down-left
                    _position.x -= 0.7;
                    _position.y += 0.3;
                    break;
                case 3: // Move up-left
                    _position.x -= 0.7;
                    _position.y -= 0.3;
                    break;
            }
        }

        void setPosition(Vector2 position) {
            _position = position;
        };

        Texture2D *_scarfy;
        Texture2D _scarfyDLeft;
        Texture2D _scarfyDRight;
        Texture2D _scarfyULeft;
        Texture2D _scarfyURight;



        Vector2 _position;
        Rectangle _frameRec;
        int _currentFrame = 0;
        int _framesCounter = 0;
        int _framesSpeed = 8;
        int _direction = 0;

        float _elapsedTime = 0.0f;
        float _changeDirectionTime = 0.5f;
};
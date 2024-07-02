FROM ubuntu:22.04

USER root
WORKDIR /app

# Install basics dependencies
RUN apt-get update
RUN apt install build-essential git -y
RUN apt-get update && apt-get install -y build-essential
RUN apt install cmake -y
RUN apt install libasound2-dev libx11-dev libxrandr-dev libxi-dev libgl1-mesa-dev libglu1-mesa-dev libxcursor-dev libxinerama-dev libwayland-dev libxkbcommon-dev -y
RUN git clone --depth 1 https://github.com/raysan5/raylib.git raylib
RUN apt install python3 -y

# Install emcc - emscripten
RUN git clone https://github.com/emscripten-core/emsdk.git
WORKDIR /app/emsdk/
RUN git pull
RUN ./emsdk install latest
RUN ./emsdk activate latest
WORKDIR /app
ENV EMSCRIPTEN=/app/emsdk/upstream/emscripten
ENV PATH=$PATH:$EMSCRIPTEN

# Install Raylib
WORKDIR /app/raylib/src/
RUN make PLATFORM=PLATFORM_DESKTOP
RUN make PLATFORM=PLATFORM_DESKTOP RAYLIB_LIBTYPE=SHARED
RUN make PLATFORM=PLATFORM_WEB
RUN make install

WORKDIR /app
COPY . /app
RUN emcc main.cpp -o index.html -I./raylib/src -L./raylib/src -lraylib -s USE_GLFW=3 -s ASYNCIFY -DPLATFORM_WEB
EXPOSE 8080

CMD ["emrun", "--no_browser", "--port", "8080", "."]
FROM ubuntu:22.04

WORKDIR /app

# Install basic dependencies
RUN apt-get update
RUN apt-get install -y build-essential git cmake libasound2-dev libx11-dev \
    libxrandr-dev libxi-dev libgl1-mesa-dev libglu1-mesa-dev libxcursor-dev \
    libxinerama-dev libwayland-dev libxkbcommon-dev python3

# Clone Raylib repository
RUN git clone --depth 1 https://github.com/raysan5/raylib.git /app/raylib

# Install emcc - Emscripten
RUN git clone https://github.com/emscripten-core/emsdk.git /app/emsdk
WORKDIR /app/emsdk
RUN ./emsdk install latest
RUN ./emsdk activate latest
WORKDIR /app
ENV EMSCRIPTEN=/app/emsdk/upstream/emscripten
ENV PATH=$PATH:$EMSCRIPTEN

# Compile Raylib for Web platform
WORKDIR /app/raylib/src
RUN /bin/bash -c "source /app/emsdk/emsdk_env.sh && make clean && make PLATFORM=PLATFORM_WEB RAYLIB_LIBTYPE=STATIC"

# Copy application code and compile with Emscripten
WORKDIR /app
COPY ./assets /app/assets
# RUN /bin/bash -c "source /app/emsdk/emsdk_env.sh"
RUN /bin/bash -c "source /app/emsdk/emsdk_env.sh && emcc main.cpp raylib/raylib.cpp src/RayCam/RayCam.cpp -o index.html -I /app/raylib/src -L /app/raylib/src -lraylib -s USE_GLFW=3 -s ASYNCIFY -DPLATFORM_WEB"

# Expose port and start the web server
EXPOSE 8080

CMD ["emrun", "--no_browser", "--port", "8080", "."]
# Use the official Ubuntu image as the base image
FROM ubuntu:22.04

WORKDIR /app

# Install basic dependencies
RUN apt-get update && \
    apt-get install -y build-essential git cmake libasound2-dev libx11-dev \
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
COPY . /app
RUN /bin/bash -c "source /app/emsdk/emsdk_env.sh && emcc src/Client/UdpClient.cpp raylib/raylib.cpp src/RayCam/RayCam.cpp src/Entity/Entity.cpp src/Map/Map.cpp Interface.cpp --shell-file custom_template.html -o index.html --preload-file assets -I /app/raylib/src -L /app/raylib/src -lraylib -s USE_GLFW=3 -s ASYNCIFY -DPLATFORM_WEB"

# # Create a directory to hold the index.html file for the `web` service
# RUN mkdir -p /app/index-html
# RUN cp /app/index.html /app/index-html/index.html

# # Expose port and start the web server
# EXPOSE 8080

# CMD ["emrun", "--no_browser", "--port", "8080", "."]

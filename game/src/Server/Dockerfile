# Use the official GCC image from the Docker Hub
FROM gcc:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the source code into the working directory
COPY UdpServer.cpp .
COPY UdpServer.hpp .

# Compile the C++ code
RUN g++ -o udp_server UdpServer.cpp -lpthread

# Expose the port that the server will run on
EXPOSE 8000

# Command to run the compiled server
CMD ["./udp_server", "8000"]

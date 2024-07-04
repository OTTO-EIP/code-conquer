# code-conquer



## Network
### Server:
    launch server:
        g++ UdpServer.cpp && ./a.out 8000
### Graphical Client:
    launch graphical client:
        g++ UdpClient.cpp ../../raylib/raylib.cpp ..//RayCam/RayCam.cpp ../Entity/Entity.cpp ../Map/Map.cpp -lraylib -lGL -lm -lpthread -ldl -lrt -lX11 && ./a.out 8000

### API:
    launch api:
        python3 -m uvicorn app:app --reload --host 0.0.0.0 --port 8081

    test /script route:
        curl -X POST "http://127.0.0.1:8081/script" -H "Content-Type: application/json" -d "{\"script\":\"0\n1\n2\n3\"}"
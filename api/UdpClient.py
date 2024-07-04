import socket
import threading
import time

BUFFER_SIZE = 1024

class UdpClient:
    def __init__(self, server_address, port):
        self.server_address = server_address
        self.port = port
        self.running = True
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.script = []

    def send_messages(self):
        while self.running:
            for command in self.script:
                if not self.running:
                    break
                self.sock.sendto(command.encode(), (self.server_address, self.port))
                print(f"Command sent: {command}")
                time.sleep(1)

    def receive_messages(self):
        while self.running:
            try:
                data, server = self.sock.recvfrom(BUFFER_SIZE)
                print(f"Received message: {data.decode()}")
            except socket.error:
                break

    def start(self):
        send_thread = threading.Thread(target=self.send_messages)
        receive_thread = threading.Thread(target=self.receive_messages)
        send_thread.start()
        receive_thread.start()
        send_thread.join()
        receive_thread.join()
        self.sock.close()

    

def main():
    server_address = "127.0.0.1"
    port = 8000

    client = UdpClient(server_address, port)
    client.script = ["0", "1", "2", "3"]
    client.start()

if __name__ == "__main__":
    main()

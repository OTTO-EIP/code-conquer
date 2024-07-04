import uvicorn
import threading
from fastapi import FastAPI
from pydantic import BaseModel
from UdpClient import UdpClient

app = FastAPI()

class ScriptBody(BaseModel):
    script: str

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/script")
def execute_script(item: ScriptBody):
    server_address = "127.0.0.1"
    port = 8000

    client = UdpClient(server_address, port)
    client.script = item.script.split("\n")

    def start_client():
        client.start()

    client_thread = threading.Thread(target=start_client)
    client_thread.start()

    return {"content": item.script}


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OLLAMA_URL = "http://localhost:11434/api/generate"

class Prompt(BaseModel):
    prompt: str


@app.post("/chat")
def chat_with_llama3(data: Prompt):
    payload = {
        "model": "llama3",
        "prompt": data.prompt,
    }

    response = requests.post(OLLAMA_URL, json=payload)

    text = ""
    for line in response.iter_lines():
        if line:
            text += line.decode("utf-8")

    return {"response": text}

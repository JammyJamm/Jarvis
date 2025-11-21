from ast import Return
from fastapi import FastAPI,Request
from fastapi.middleware.cors import CORSMiddleware
import requests
from pydantic import BaseModel
from firebase_admin import credentials, firestore, initialize_app
from apscheduler.schedulers.background import BackgroundScheduler
import datetime
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
#---------------------- Push firebase store ---------------------- #
cred = credentials.Certificate("credentials.json")
initialize_app(cred)
db = firestore.client()

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

#---------------------- Get IP config geolocation ---------------------- #
@app.get("/location")
def get_location():
    data = get_location_data()  # fetch IP + geo
    today_date = datetime.datetime.now().strftime("%d-%m-%Y")
    if "error" in data:
        return {"status": "failed", "error": data["error"]}
    # Condtion check same date in firebase 
    if check_document_exists(datetime.datetime.now().strftime("%d-%m-%Y")):
         db.collection("daily_data").document(today_date).set(data, merge=True)
    else:
        db.collection("daily_data").document(today_date).set(data)
    return {
        "status": "success",
        "saved": True,
        "data": data
    }
# Condtion check same date in firebase 
def check_document_exists(today_date):
    doc_ref = db.collection("daily_data").document(today_date)
    doc = doc_ref.get()
    return doc.exists

def get_location_data():
    try:
        public_ip = requests.get("https://api.ipify.org").text
        geo = requests.get(f"http://ip-api.com/json/{public_ip}").json()
        return {
           datetime.datetime.now().strftime("%H:%M:%S"):{
                "ip": public_ip,
                "location": geo
            }
         }

    except Exception as e:
        return {"error": str(e)}

scheduler = BackgroundScheduler()
scheduler.add_job(get_location, "interval", minutes=30)
scheduler.start()
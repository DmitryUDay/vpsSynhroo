from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Защита CORS: только твой фронтенд сможет слать запросы
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://disite-studio.pro",
        "https://www.disite-studio.pro",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/v1/data")
async def receive_data(request: Request):
    try:
        body = await request.json()
    except Exception:
        body = (await request.body()).decode("utf-8")
        
    print("\n================ NEW API REQUEST ================")
    print(f"Origin Header: {request.headers.get('origin')}")
    print(f"Payload Data:  {body}")
    print("=================================================\n", flush=True)
    
    return {"status": "success", "received": body}
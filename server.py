from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Разрешаем браузеру делать запросы с сторонних доменов (GitHub Pages)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Можно указать ["https://disite-studio.pro"], если хочешь ограничить доступ
    allow_credentials=True,
    allow_methods=["*"],  # Разрешает POST, GET, OPTIONS и т.д.
    allow_headers=["*"],
)

@app.post("/api/v1/data")
async def receive_data(data: dict):
    print("Получены данные:", data)
    return {"status": "success", "received": data}
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import httpx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = "363564d5479862c56e8ee02772172d90"
YANDEX_EMAIL = "disitestudiodigital@yandex.ru"  # Куда присылать заявки

class LeadForm(BaseModel):
    name: str
    contact: str
    description: Optional[str] = "Без описания"

@app.post("/api/v1/data")
async def receive_data(form: LeadForm):
    # Формируем HTML письма
    html_content = f"""
    <h2>Новая заявка с сайта disite-studio.pro!</h2>
    <p><b>Имя:</b> {form.name}</p>
    <p><b>Контакт:</b> {form.contact}</p>
    <p><b>Задача:</b> {form.description}</p>
    """

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "from_email": "info@mailopost.ru",
        "from_name": "Disite Studio Bot",
        "to": YANDEX_EMAIL,
        "subject": f"Заявка от {form.name}",
        "html": html_content
    }

    async with httpx.AsyncClient() as client:
        response = await client.post("https://api.mailopost.ru/v1/email/send", json=payload, headers=headers)

    if response.status_code == 200 or response.status_code == 201:
        return {"status": "ok", "message": "Заявка улетела на Яндекс!"}
    else:
        raise HTTPException(status_code=500, detail="Ошибка отправки письма")
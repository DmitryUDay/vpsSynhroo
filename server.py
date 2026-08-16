import json
import os
import uuid
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

LEADS_FILE = "leads.json"

# Секретный роут для твоего дашборда
SECRET_DASH_ROUTE = "/adminDahsPannelelele"


def load_leads():
    if not os.path.exists(LEADS_FILE):
        return []
    try:
        with open(LEADS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []


def save_leads(data):
    with open(LEADS_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


# --- 1. ПРИЕМ ЗАЯВОК (Шлют лендосы) ---
@app.route("/lead", methods=["POST"])
def handle_lead():
    data = request.get_json()
    if not data:
        return jsonify({"status": "error", "message": "Empty JSON"}), 400

    leads = load_leads()
    data["id"] = str(uuid.uuid4())[:8]
    leads.append(data)
    save_leads(leads)

    print(
        f"[БАЗА] Заявка от {data.get('name', 'Anon')} сохранена в {LEADS_FILE}!"
    )
    return jsonify({"status": "ok", "message": "Success"}), 200


# --- 2. ТВОЯ СЕКРЕТНАЯ АДМИНКА ---
@app.route(SECRET_DASH_ROUTE, methods=["GET"])
def secret_dashboard():
    return render_template("dash.html")


# --- 3. АПИ ДЛЯ РЕНДЕРА ДАННЫХ ВНУТРИ АДМИНКИ ---
@app.route("/api/getLeads", methods=["GET"])
def get_leads_api():
    leads = load_leads()
    return jsonify({"status": "ok", "leads": leads}), 200


# --- 4. ПИНГ ДЛЯ ПРОВЕРКИ ---
@app.route("/ping", methods=["GET", "POST"])
def ping():
    return jsonify({"status": "ok", "message": "Server is active"}), 200


if __name__ == "__main__":
    # Слушаем локально, cloudflared сам перенаправит сюда трафик
    app.run(host="127.0.0.1", port=8000)
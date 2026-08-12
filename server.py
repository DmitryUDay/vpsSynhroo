import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Разрешаем CORS-запросы с любого источника

# Настройки Яндекс SMTP
SMTP_SERVER = "smtp.yandex.ru"
SMTP_PORT = 465
SMTP_USER = "disiteStudioDigital@yandex.ru"
# Создай пароль приложения в Яндекс ID (Безопасность -> Пароли приложений)
SMTP_PASSWORD = "zzjfejprgihwlypp"

def send_lead_email(lead_data):
    recipient = "disiteStudioDigital@yandex.ru"
    subject = f"Новая заявка с сайта [{lead_data.get('idSites', 'disite')}]"

    # Красивое HTML-письмо с выделенными жирным полями
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
    </head>
    <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #2c3e50;">Привет блядь такая! Тебе от DiSite заявка:</h2>
        <div style="background-color: #f8f9fa; border-left: 4px solid #007bff; padding: 15px; margin: 15px 0;">
            <p><strong>Метка сайта (idSites):</strong> {lead_data.get('idSites', 'disite')}</p>
            <p><strong>Ключ доступа (access_key):</strong> {lead_data.get('access_key', 'не указан')}</p>
            <hr style="border: 0; border-top: 1px solid #eee;">
            <p><strong>Имя:</strong> <span style="font-size: 1.1em; color: #000;">{lead_data.get('name', 'Не указано')}</span></p>
            <p><strong>Контакты (Телефон / TG / Email):</strong> <span style="font-size: 1.1em; color: #000;">{lead_data.get('contact', 'Не указано')}</span></p>
            <p><strong>Пожелания к проекту:</strong></p>
            <blockquote style="background: #fff; padding: 10px; border: 1px solid #ddd; margin: 5px 0;">
                <strong>{lead_data.get('message', 'Без пожеланий')}</strong>
            </blockquote>
        </div>
        <p style="font-size: 0.8em; color: #777;">Заявка успешно обработана сервером UCloud 01.</p>
    </body>
    </html>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = SMTP_USER
    msg["To"] = recipient

    msg.attach(MIMEText(html_content, "html", "utf-8"))

    # Отправка по SSL (порт 465)
    with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as server:
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, recipient, msg.as_string())


@app.route('/lead', methods=['POST'])
def handle_lead():
    data = request.get_json()

    if not data:
        return jsonify({"status": "error", "message": "Empty JSONchik"}), 400

    try:
        # Отправляем письмо
        send_lead_email(data)
        return jsonify({"status": "ok", "message": "SuccesFull"}), 200
    except Exception as e:
        print(f"Ошибка при отправке почты: {e}")
        return jsonify({"status": "error", "message": "Error mail server"}), 500


@app.route('/ping', methods=['GET', 'POST'])
def ping():
    return jsonify({"status": "ok", "message": "Server is active"}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)

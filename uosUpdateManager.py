#Обновлятор и установщик пакетов UDay operation system
import base64
import json
import os
import paho.mqtt.client as mqtt

MQTT_BROKER = "broker.hivemq.com"
MQTT_PORT = 1883

# Тот же самый топик, что и у вещателя!
TOPIC_NAME = "uos/dmitry_uos_channel_secret_999"
UPDATE_DIR = "/root/UOS/updates"


def on_connect(client, userdata, flags, rc, properties=None):
    if rc == 0:
        print(f"📡 Поймали коннект к брокеру {MQTT_BROKER}!")
        print(f"🎧 Сидим в топике: {TOPIC_NAME}")
        print(f"📂 Качаем всё в: {UPDATE_DIR}\n")
        client.subscribe(TOPIC_NAME)
    else:
        print(f"❌ Ошибка подключения к брокеру: {rc}")


def on_message(client, userdata, msg):
    try:
        data = json.loads(msg.payload.decode("utf-8"))
        rel_path = data["rel_path"]
        file_bytes = base64.b64decode(data["content"])

        full_save_path = os.path.normpath(os.path.join(UPDATE_DIR, rel_path))
        if not full_save_path.startswith(UPDATE_DIR):
            return

        os.makedirs(os.path.dirname(full_save_path), exist_ok=True)
        with open(full_save_path, "wb") as f:
            f.write(file_bytes)

        print(f"📥 [ИЗ ТОПИКА ПОЙМАЛИ]: {rel_path} -> {full_save_path}")
    except Exception as e:
        print(f"❌ Ошибка разбора: {e}")


def start_receiver():
    os.makedirs(UPDATE_DIR, exist_ok=True)
    client = mqtt.Client(
        callback_api_version=mqtt.CallbackAPIVersion.VERSION2
    )
    client.on_connect = on_connect
    client.on_message = on_message

    client.connect(MQTT_BROKER, MQTT_PORT, 60)
    client.loop_forever()


if __name__ == "__main__":
    start_receiver()
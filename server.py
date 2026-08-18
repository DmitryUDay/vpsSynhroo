from flask import Flask, request
import json

app = Flask(__name__)

@app.route('/', methods=['POST'])
def handle_json():
    data = request.get_json()
    print("\n" + "="*50)
    print("ПРИШЛИ ДАННЫЕ:")
    print(json.dumps(data, indent=2, ensure_ascii=False))
    print("="*50 + "\n")
    return {"status": "ok", "received": data}, 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)



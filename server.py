from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/ping', methods=['POST', 'GET'])
def ping():
    print(">>> ПРИВЕТ МИР! СИГНАЛ С САЙТА ПОЛУЧЕН! <<<", flush=True)
    return jsonify({"status": "ok", "message": "иди нахуй долбаеб!"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
from flask import Flask, render_template, request, jsonify
from PIL import Image
import pytesseract
import io

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/scan-image", methods=["POST"])
def scan_image():
    file = request.files['image']
    img = Image.open(io.BytesIO(file.read()))
    text = pytesseract.image_to_string(img)
    return jsonify({"text": text})

@app.route("/ask-ai")
def ask_ai():
    question = request.args.get("question")
    # Dummy answer (replace with real API if needed)
    return jsonify({"answer": f"Suggested advice for: {question}"})

if __name__ == "__main__":
    app.run(debug=True)

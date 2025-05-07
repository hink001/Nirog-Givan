from flask import Flask, render_template, request, jsonify
from PIL import Image
import pytesseract
import io
import requests

app = Flask(__name__)

# Configure Tesseract path (if needed)
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/scan-image", methods=["POST"])
def scan_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    
    try:
        file = request.files['image']
        img = Image.open(io.BytesIO(file.read()))
        
        # Use Tesseract OCR (local, no API needed)
        text = pytesseract.image_to_string(img)
        return jsonify({"text": text.strip()})
    
    except Exception as e:
        return jsonify({"error": f"OCR failed: {str(e)}"}), 500

@app.route("/ask-ai", methods=["GET"])
def ask_ai():
    question = request.args.get("question")
    if not question:
        return jsonify({"error": "No question provided"}), 400
    
    try:
        # Using Hugging Face Inference API (free)
        API_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium"
        headers = {"Authorization": "Bearer hf_YOUR_TOKEN"}  # Optional for higher rate limits
        
        response = requests.post(API_URL, headers=headers, json={"inputs": question})
        response.raise_for_status()
        
        data = response.json()
        answer = data.get("generated_text", "Could not generate answer")
        
        return jsonify({"answer": answer})
    
    except Exception as e:
        # Fallback to local logic if API fails
        return jsonify({"answer": f"Suggested advice for: {question}"})

if __name__ == "__main__":
    app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Configure Gemini API
genai.configure(api_key="YOUR_GEMINI_API_KEY")

@app.route("/analyze-mood", methods=["POST"])
def analyze_mood():
    data = request.json
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No input provided"}), 400

    emotions = "[joy, sadness, excitement, calmness, nostalgia]"
    instructions = f"Analyze the mood of this text: {text}. Respond in JSON format with confidence scores for: {emotions}"

    response = genai.GenerativeModel("gemini-2.0-flash").generate_content(instructions)

    try:
        mood_data = json.loads(response.text)
    except json.JSONDecodeError:
        mood_data = {"error": "Invalid AI response"}

    return jsonify(mood_data)

if __name__ == "__main__":
    app.run(debug=True)


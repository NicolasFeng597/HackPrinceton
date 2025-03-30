from flask import Flask, request, render_template
from inputAnalysis import inputAnalysis
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)
print("Loaded GEMINI_API_KEY:", os.getenv("GEMINI_API_KEY"))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    prompt = request.form['prompt']
    # Access the environment variable only at script execution
    api_key = os.getenv('GEMINI_API_KEY')  # Retrieve API_KEY here
    print(api_key)
    if not api_key:
        return "API_KEY not found in environment variables.", 500
    # Call the external script and pass user data and API_KEY
    return inputAnalysis(prompt, api_key)

if __name__ == '__main__':
    app.run(debug=True)

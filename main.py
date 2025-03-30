import os
from flask import Flask, render_template, request
from inputAnalysis import inputAnalysis
from dotenv import load_dotenv

app = Flask(__name__)

@app.route('/')
def index():
    # Serve the form
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    # Retrieve form data from the user
    prompt = request.form.get('prompt')
    load_dotenv()
    api_key = os.getenv('API_KEY')
    if not api_key:
        return "API_KEY not found in environment variables.", 500
    return inputAnalysis(prompt, api_key)

if __name__ == '__main__':
    app.run(debug=True)

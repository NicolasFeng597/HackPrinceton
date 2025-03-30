from flask import Flask, request, render_template
from inputAnalysis import inputAnalysis
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    prompt = request.form['prompt']
    result = inputAnalysis(prompt)
    return result
    
    # Access the environment variable only at script execution
    api_key = os.getenv('API_KEY')  # Retrieve API_KEY here
    if not api_key:
        return "API_KEY not found in environment variables.", 500

    # Call the external script and pass user data and API_KEY
    subprocess.run(["python", "inputAnalysis.py", prompt, api_key], check=True)W

if __name__ == '__main__':
    app.run(debug=True)

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
    api_key = os.getenv('API_KEY')
    result = inputAnalysis(prompt, api_key)
    return result

if __name__ == '__main__':
    app.run(debug=True)

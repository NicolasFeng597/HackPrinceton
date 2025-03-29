from flask import Flask, request, render_template
from inputAnalysis import inputAnalysis

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    prompt = request.form['prompt']
    result = inputAnalysis(prompt)
    return result

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, render_template
from

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form['name']
    return

if __name__ == '__main__':
    app.run(debug=True)

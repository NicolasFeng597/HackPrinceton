# Install flask
pip install flask

# Import flask
from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/submit', methods=['GET'])
def submit():
    user_input = request.args.get('textInput')
    
if __name__ == '__main__':
    app.run(debug=True)

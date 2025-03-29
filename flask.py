# Import flask
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/submit', methods=['GET'])
def submit():
    user_input = request.args.get('textInput')
    
if __name__ == '__main__':
    app.run(debug=True)

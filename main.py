import os
import subprocess
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    # Serve the form
    return render_template('form.html')

@app.route('/submit', methods=['POST'])
def submit():
    # Retrieve form data from the user
    user_data = request.form.get('user_input')

    # Validate the form data
    if not user_data:
        return "Invalid input. Please provide valid data.", 400

    try:
        # Access the API_KEY environment variable ONLY when the form is submitted
        api_key = os.getenv('API_KEY')
        if not api_key:
            return "API_KEY not found in environment variables.", 500

        # Execute the script and pass the user data and API key as arguments
        subprocess.run(["python", "your_script.py", user_data, api_key], check=True)

    except subprocess.CalledProcessError as e:
        return f"Error running script: {e}", 500

    return "Script executed successfully! Thank you!", 200

if __name__ == '__main__':
    app.run(debug=True)

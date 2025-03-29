from flask import Flask, send_file, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def dynamic_file():
    # Logic to generate the dynamic file content
    file_content = "This is dynamically generated content."
    
    # Create a temporary file
    with open("temp.txt", "w") as temp_file:
        temp_file.write(file_content)
    
    # Send the temporary file
    return send_file("temp.txt", as_attachment=True, download_name="dynamic_file.txt")

@app.route('/index.html')
def from_directory(filename):
    # Ensure the path is safe
    directory = os.path.abspath("./files")
    return send_from_directory(directory, filename)

if __name__ == '__main__':
    # Create the 'files' directory if it doesn't exist
    if not os.path.exists("./files"):
        os.makedirs("./files")
    
    # Create a sample file for testing
    with open("./files/sample.txt", "w") as f:
        f.write("This is a sample file.")

    app.run(debug=True)

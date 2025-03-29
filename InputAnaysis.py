# Install the Gemini package

pip install -q -U google-genai

# Securely import the API key

from google.colab import userdata
userdata.get('GOOGLE_API_KEY')

# Import gemini AI sentiment model
from google import genai

# Import json
import json

# Prompt engineer Gemini to generate mood analysis

# Get the API key
client = genai.Client(api_key=userdata.get('GOOGLE_API_KEY'))

# List of 27 emotions
emotions = (
    "[admiration, adoration, aesthetic appreciation, amusement, anger, anxiety, awe, awkwardness, boredom, calmness, confusion, craving, disgust, empathic pain, entrancement, excitement, fear, horror, interest, joy, nostalgia, relief, romance, sadness, satisfaction, sexual desire, surprise]"
    )

# User input
prompt = input("Enter a string of text: ")

# String of instructions
instructions = "You will be given a string of text. Your goal is to analyze the mood and emotions of this string. Only include from the following list: " + emotions + ". Output only {<emotion>: confidence value, } on a single line (similar to JSON) with 27 dimensions with each emotion corresponding to a confidence value for the string where the total confidence values add up to 1. Here is the string: {" + prompt + "}"

# Generate the response of the model
response = client.models.generate_content(
    model="gemini-2.0-flash", contents=instructions
)

# Convert the response to a python dictionary / JSON object
json_object = json.loads(response.text)
print(json_object)
print(type(json_object))

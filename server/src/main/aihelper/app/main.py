import os
from fastapi import APIRouter, FastAPI
import openai
import re
from pydantic import BaseModel
from datetime import datetime
import dateparser
import requests

app = FastAPI()

openai.organization = os.environ.get('OPENAI_ORGANIZATIO')
openai.api_key = os.environ.get('OPENAI_API_KEY')
openai.Model.list()

class Input(BaseModel):
    text: str


router = APIRouter(prefix="/api/aihelper")

@router.post("/image")
async def chatbot(input: Input):
    response = openai.Image.create(
    prompt="a white siamese cat fighting aliens",
    n=1,
    size="1024x1024"
    )
    image_url = response['data'][0]['url']
    return image_url


def find_date(text):
    # Split the text into words
    words = text.split()
    
    # Iterate over the words
    for i in range(len(words)):
        # Try parsing each consecutive sequence of 3 words as a date
        for j in range(i, min(i + 3, len(words))):
            # Join the words together
            phrase = " ".join(words[i:j+1])
            
            # Try to parse the phrase as a date
            date = dateparser.parse(phrase)
            
            # If a date was found, return it
            if date is not None:
                return date
                
    # If no date was found, return None
    return None

@router.post("/chatbot2")
async def chatbot2(input: Input):
    with open('./prompts.txt', 'r') as file:
        prompt = file.read()

    prompt += input.text

    prompt += "\nStudioNest ChatBot Answer: \n"

    print(prompt)
    
    response = openai.Completion.create(
    model="text-davinci-003",
    max_tokens=200,
    top_p=1,
    frequency_penalty=0.0,
    presence_penalty=0.0,
    prompt=prompt,

    )
    print(response.choices[0])

    # Analysing the response and checking if the user wants to book a room

    # date_match = re.search(r"\b(\d{1,2} \w+)", input.text)
    # formatted_date = None
    # if date_match:
    #     date_string = date_match.group(1)
    #     date = datetime.strptime(date_string, "%d %B")  # Parse to datetime object
    #     formatted_date = date.strftime('%Y-%m-%dT')  # Convert to your required format

    # print(date_match)

    date_match = re.search(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z', input.text)

    # Find start time in format "Hour:Minute"
    time_match = re.search(r"(\d{1,2}:\d{2})", input.text)
    if time_match:
        time = time_match.group(1)

    # Combine date and time
    # datetime_string = formatted_date + time + ":00Z"
    # print(datetime_string)

    # Match a duration using regular expression
    duration_match = re.search(r'(\d+)\s*hours', input.text)
    if duration_match:
        duration = duration_match.group(1)  # Use this duration for your booking
    response_text = response.choices[0].text.lower()
    if 'book' in response_text or 'reserve' in response_text:
        # Define your data for booking a room
        booking_data = {
            "roomId": "64775a1d1077f82dfa26ecc6",
            "duration": duration,
            "totalPrice": 36,
            "dateFrom": date_match.group(0),
            "booker": {
                "email": "pepepe@gmail.com",
                "name": "pepepe",
                "uid": "Sbk5C3qxu5Pz1HtOpecVwEoWtzv2"
            },
            "backline": [
                {
                    "quantity": 2,
                    "name": "cabinettt",
                    "price": 8.6
                },
                {
                    "quantity": 1,
                    "name": "cabinet da da",
                    "price": 8.6
                }
            ]
        }
        # Call your API endpoint to create booking
        booking_response = requests.post("http://api-service:8080/api/booking/booking", json=booking_data)
        # Check if booking was successful
        if booking_response.status_code == 201:
            print("Booking was successful.")
            return "Sure. I successfuly created a booking for you on " + datetime.fromisoformat(date_match.group(0)[:-1]).strftime("%A, %B %d, %Y at %I:%M %p") + " for " + duration + " hours";
        else:
            print("Failed to create a booking.")
    return response.choices[0].text



@router.post("/chatbot")
async def chatbot(input: Input):
    with open('./prompts.txt', 'r') as file:
        prompt = file.read()

    prompt += input.text

    prompt += "\nStudioNest ChatBot Answer: \n"
    
    response = openai.Completion.create(
    model="text-davinci-003",
    max_tokens=200,
    top_p=1,
    frequency_penalty=0.0,
    presence_penalty=0.0,
    prompt=prompt,

    )
    print(response.choices[0])
    return response.choices[0].text


app.include_router(router)
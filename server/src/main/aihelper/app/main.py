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
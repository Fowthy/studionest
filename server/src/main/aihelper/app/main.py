import os
from fastapi import FastAPI
import openai
from pydantic import BaseModel

app = FastAPI()

openai.organization = "org-E0lz7rQrnKV5GBiifePxqryD"
openai.api_key = "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"
openai.Model.list()

class Input(BaseModel):
    text: str

@app.post("/chatbot")
async def chatbot(input: Input):
    response = openai.Image.create(
    prompt="a white siamese cat fighting aliens",
    n=1,
    size="1024x1024"
    )
    image_url = response['data'][0]['url']
    return image_url
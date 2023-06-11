FROM python:3.11-slim-bullseye
# 
WORKDIR .

# 
COPY ./requirements.txt ./requirements.txt

# 
RUN pip install --no-cache-dir --upgrade -r ./requirements.txt

# 
COPY ./app ./app
# CMD ["python", "main.py"] 
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8444", "--env-file","app/.env"]
# Or enter the name of your unique directory and parameter set.
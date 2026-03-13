# USED UBUNTU IMAGE 
FROM ubuntu:24.04

#SETTING UP IMAGE & INSTALLATION 
RUN apt-get update && apt-get install -y python3 git apache2 pip
RUN service apache2 start 

#SETTING UP WORKING-DIRECTORY AND COPY CODE FROM SOURCE 
WORKDIR /app
COPY pyproject.toml .
RUN pip install . --break-system-packages

COPY . .

CMD [ "python3", "main.py" ]



# USED UBUNTU IMAGE 
FROM ubuntu:24.04

#SETTING UP IMAGE & INSTALLATION 
RUN apt-get update && apt-get install -y python3 git apache2 pip

#SETTING UP WORKING-DIRECTORY AND COPY CODE FROM SOURCE 
WORKDIR /app
COPY pyproject.toml .
RUN pip install . --no-cache-dir --break-system-packages

COPY . .

RUN chmod +x run.sh

CMD [ "/bin/bash", "run.sh" ]

EXPOSE 80


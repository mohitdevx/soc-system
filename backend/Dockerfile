# NODE JS IMAGE 
FROM node:22-alpine

# pnpm Installation 
RUN npm install -g pnpm 

# Setting up working dir & copy dependencies file 
WORKDIR /app
COPY package.json pnpm-lock.yaml ./

# Installing Dependencies 
RUN pnpm install 

# copy project
COPY . .

# Typescript Build
RUN pnpm run build

#Expose Port 
EXPOSE 3000

# Command line argument & image runner 
CMD [ "node", "dist/server.js" ]


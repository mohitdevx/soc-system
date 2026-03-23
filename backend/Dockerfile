# NODE JS IMAGE 
FROM node:22-alpine

# pnpm Installation 
RUN npm install -g pnpm 

# Setting up working dir & copy dependencies file 
WORKDIR /app
COPY package.json pnpm-lock.yaml prisma.config.ts ./

RUN pnpm install --frozen-lockfile

# Installing Dependencies 
RUN pnpm install 

# copy project
COPY . .

# Generate prisma client 
RUN pnpm run generate

# Typescript Build
RUN pnpm run build

# Command line argument & image runner 
CMD ["sh", "-c", "node dist/server.js"]

#Expose Port 
EXPOSE 3000
# NODE JS IMAGE 
FROM node:22-alpine

# pnpm Installation 
RUN npm install -g pnpm 

# Setting up working dir & copy dependencies file 
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY ./src/prisma.config.ts ./src/prisma.config.ts
COPY ./src/prisma ./src/prisma

RUN pnpm install --frozen-lockfile

# Installing Dependencies 
RUN pnpm install 

# copy project
COPY . .

# Generate Prisma
RUN pnpm exec prisma generate

# Typescript Build
RUN pnpm run build

#Expose Port 
EXPOSE 3000

# Command line argument & image runner 
CMD ["sh", "-c", "pnpm exec prisma migrate deploy && node dist/server.js"]

FROM node:latest AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3333
CMD ["npm","run","prisma:dev"] 
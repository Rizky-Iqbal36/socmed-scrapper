FROM node:16-alpine AS builder

WORKDIR /app

# Copy all files ( except that listed in .dockerignore )
COPY package*.json ./
COPY . .

RUN cp .env.example .env

RUN npm install
RUN npm run build

EXPOSE 3000

CMD [ "npm" ,"run", "start:dev"]

FROM node:16-alpine AS final

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package*.json ./

RUN npm i --only=prod

EXPOSE 3000

CMD [ "npm" ,"run", "start:prod"]
FROM node:24-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "pnpm", "run", "start:dev" ]
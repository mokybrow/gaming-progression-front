FROM node:20.9.0

WORKDIR /app


# ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json .

COPY . .

RUN npm install

RUN npx next telemetry disable

RUN npm run build

EXPOSE 3000

# CMD ["npm", "run", "start"]

FROM node:alpine

WORKDIR /client
COPY package.json .
RUN npm install --only=prod
RUN node -v
COPY . .

CMD ["npm",  "start"]
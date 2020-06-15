# docker build -t pinkelgrg/app-client:latest .
# docker push pinkelgrg/app-client:latest

FROM pinkelgrg/node-python:latest

WORKDIR /client
COPY package*.json ./
RUN npm install
RUN node -v
ENV CI=true
COPY . .

CMD ["npm",  "run", "dev"]

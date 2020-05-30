# docker build -t pinkelgrg/app-client .
# docker push pinkelgrg/app-client

FROM pinkelgrg/node-python:latest

WORKDIR /client
COPY package.json .
RUN npm install --only=prod
RUN node -v
ENV CI=true
COPY . .

CMD ["npm",  "run", "start"]
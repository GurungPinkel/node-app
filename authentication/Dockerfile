# docker build -t pinkelgrg/app-authentication .
# docker push pinkelgrg/app-authentication

FROM pinkelgrg/node-python:latest

WORKDIR /authentication
COPY package.json .
RUN npm install
RUN node -v
COPY . .

CMD ["npm", "start"]
# # Create app directory
# WORKDIR /app

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY package.json ./

# RUN npm install
# # If you are building your code for production
# # RUN npm ci --only=production

# COPY . .

# CMD [ "npm", "run", "dev" ]

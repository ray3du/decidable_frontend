FROM node:20-alpine
WORKDIR /app
COPY ./package* /app/
RUN npm install --legacy-peer-deps
COPY . /app/ 
CMD [ "npm", "run", "dev" ]


  
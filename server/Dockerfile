FROM node:21-alpine
WORKDIR /server
COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install
COPY . .
EXPOSE 3001
CMD ["node", "index.js"]

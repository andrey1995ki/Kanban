FROM node:21-alpine as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.16.0-alpine
COPY ./nginx/defaul.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ng-client/browser /usr/share/nginx/html/kanban
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]

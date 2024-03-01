FROM node:21-alpine as build
WORKDIR /app
COPY package.json .
RUN npm install --force
COPY . .
RUN npm run build
RUN npm run build-storybook

FROM nginx:1.16.0-alpine
COPY ./nginx/defaul.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html/kanban
COPY --from=build /app/storybook-static /usr/share/nginx/html/storybook
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

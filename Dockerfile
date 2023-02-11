# build stage
FROM node:16.18.1-alpine as build-stage
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

# production stage
FROM nginx:1.21 as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY ./conf/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
FROM  node:14.16.1-buster as builder

WORKDIR /scripts

ADD app .

RUN npm install

RUN npm run build

FROM  nginx:1.19.0

COPY --from=builder /scripts/dist /usr/share/nginx/html

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]

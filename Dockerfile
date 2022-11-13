# Build environment
FROM node:12.10.0-alpine as build

WORKDIR /app
COPY package.json .
COPY yarn.lock .

# To handle 'not get uid/gid'
RUN npm config set unsafe-perm true

RUN npm install yarn --global --silent
RUN yarn global add react-scripts@3.0.1 --silent
RUN yarn --production
COPY . /app
RUN yarn run build

# Production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /app/build
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

COPY ./init.sh ./init.sh
RUN chmod 775 ./init.sh
RUN chmod +x ./init.sh

EXPOSE 80
# On runtime
CMD ["./init.sh"]

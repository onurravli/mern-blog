FROM node:lts-alpine AS builder
WORKDIR /usr/local/app/packages/frontend
COPY . .
RUN npm install && npm cache clean --force
EXPOSE 3000
CMD ["npm", "run", "dev"]
FROM node:lts-alpine AS builder
WORKDIR /usr/local/app/packages/backend
COPY package.json ./package.json
COPY tsconfig.json ./tsconfig.json
RUN npm install && npm cache clean --force
COPY . .
RUN npm run build

FROM node:lts-alpine as development
WORKDIR /usr/local/app/packages/backend
COPY --from=builder /usr/local/app/packages/backend/dist ./dist
COPY package.json ./package.json
RUN npm install --omit=dev
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
FROM node:18.10.0-alpine AS builder
ENV NODE_ENV build
USER node
WORKDIR /home/node

COPY package.json ./
RUN npm i

COPY --chown=node:node . .
RUN npm run build \
    && npm prune --omit=dev


FROM node:18.10.0-alpine
ENV NODE_ENV production
USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

CMD ["node", "dist/main.js"]
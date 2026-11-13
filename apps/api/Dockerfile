FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/api/prisma apps/api/prisma
RUN npm ci
COPY apps/api apps/api
RUN npm run build --workspace=@keycloak-app/api

FROM node:22-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/api/prisma apps/api/prisma
RUN npm ci --omit=dev
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=build /app/apps/api/dist apps/api/dist
COPY --from=build /app/apps/api/prisma apps/api/prisma
EXPOSE 3000
CMD ["npm", "run", "start", "--workspace=@keycloak-app/api"]

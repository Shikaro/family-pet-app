# --- Build frontend ---
FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY frontend/package.json frontend/
COPY package.json package-lock.json ./
RUN npm ci --workspace frontend
COPY frontend/ frontend/
RUN npm --workspace frontend run build

# --- Build backend ---
FROM node:20-alpine AS backend-build
WORKDIR /app
COPY backend/package.json backend/
COPY package.json package-lock.json ./
RUN npm ci --workspace backend
COPY backend/ backend/
RUN npm --workspace backend run build

# --- Production ---
FROM node:20-alpine
WORKDIR /app
COPY backend/package.json backend/
COPY package.json package-lock.json ./
RUN npm ci --workspace backend --omit=dev
COPY --from=backend-build /app/backend/dist backend/dist
COPY --from=frontend-build /app/frontend/dist frontend/dist

ENV NODE_ENV=production
EXPOSE 4000

CMD ["node", "backend/dist/index.js"]

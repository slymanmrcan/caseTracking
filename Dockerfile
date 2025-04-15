# 1. Aşama: Build ortamı
FROM node:lts-alpine AS builder
WORKDIR /app

# package dosyalarını kopyala ve tüm bağımlılıkları kur
COPY package*.json ./
RUN npm install

# tüm dosyaları kopyala ve build et
COPY . .
RUN npm run build


# 2. Aşama: Production ortamı (sadece gerekli dosyalarla)
FROM node:lts-alpine
WORKDIR /app
ENV NODE_ENV=production

# Sadece gerekli dosyaları kopyala
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000
CMD ["npm", "start"]

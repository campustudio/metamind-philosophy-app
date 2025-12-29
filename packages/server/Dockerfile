FROM node:18-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy workspace files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/shared ./packages/shared
COPY packages/server ./packages/server

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build server
RUN pnpm --filter @yuansixiang/server build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY --from=builder /app/pnpm-workspace.yaml /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/packages/shared/package.json ./packages/shared/
COPY --from=builder /app/packages/server/package.json ./packages/server/

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy built files
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/server/dist ./packages/server/dist

WORKDIR /app/packages/server

EXPOSE 3000

CMD ["node", "dist/main"]

# Metamind

Educational Companion Platform - WeChat Mini Program + H5 Multi-platform Application

## Tech Stack

### Frontend

- **Framework**: Taro 3.x + React 18 + TypeScript
- **State Management**: Redux Toolkit
- **UI Components**: NutUI 4.x
- **Styling**: Tailwind CSS + SCSS
- **Data Validation**: Zod
- **Internationalization**: i18next + react-i18next

### Backend

- **Framework**: Nest.js + TypeScript
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT
- **Validation**: class-validator

### Deployment

- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Cloud Services**: Alibaba Cloud (ECS + OSS + CDN + MongoDB)

## Project Structure

```
yuansixiang/
├── packages/
│   ├── app/                 # Taro app (Mini Program + H5)
│   ├── shared/              # Shared code (types, schemas, i18n)
│   └── server/              # Backend API service
├── pnpm-workspace.yaml      # Monorepo configuration
└── package.json
```

## Getting Started

### Install Dependencies

```bash
pnpm install
```

## Service Management

### Starting Services

#### 1. Start MongoDB Database

```bash
# Start with Homebrew
brew services start mongodb-community

# Or start with Docker
docker-compose up -d
```

#### 2. Start Backend API Service

```bash
# Run in project root directory
pnpm dev:server

# Service URL: http://localhost:3000/api
# API Health Check: http://localhost:3000/api/health
```

#### 3. Start Frontend H5 Application

```bash
# Run in project root directory
pnpm dev:h5

# Service URL: http://localhost:10086
```

#### 4. Start WeChat Mini Program

```bash
# Run in project root directory
pnpm dev:weapp

# Open packages/app directory with WeChat DevTools
```

#### Start All Services

```bash
# 1. Start MongoDB
brew services start mongodb-community

# 2. Start backend (recommended in a new terminal)
pnpm dev:server

# 3. Start frontend H5 (recommended in a new terminal)
pnpm dev:h5
```

### Stopping Services

#### Stop MongoDB

```bash
# Stop with Homebrew
brew services stop mongodb-community

# Or stop Docker container
docker-compose down
```

#### Stop Backend Service

```bash
# Method 1: Stop by process name
pkill -f "nest start"

# Method 2: Stop by port
lsof -ti:3000 | xargs kill -9
```

#### Stop Frontend H5 Service

```bash
# Method 1: Stop by process name
pkill -f "taro build"

# Method 2: Stop by port
lsof -ti:10086 | xargs kill -9
```

#### Stop All Services

```bash
# Stop frontend
pkill -f "taro build"
lsof -ti:10086 | xargs kill -9

# Stop backend
pkill -f "nest start"
lsof -ti:3000 | xargs kill -9

# Stop MongoDB
brew services stop mongodb-community
```

### Check Service Status

```bash
# Check port usage
lsof -i:3000,10086,27017

# Check MongoDB status
brew services list | grep mongodb

# Check process status
ps aux | grep -E "nest|taro|mongod" | grep -v grep

# Test backend API
curl http://localhost:3000/api/health

# Test frontend H5
curl -I http://localhost:10086
```

### Build Production Version

```bash
# WeChat Mini Program
pnpm build:weapp

# H5
pnpm build:h5

# Backend
pnpm build:server
```

## Development Guidelines

- Use TypeScript strict mode
- Follow ESLint and Prettier standards
- Run `pnpm lint` and `pnpm type-check` before committing
- Use Conventional Commits specification for commit messages

## Requirements

- Node.js >= 18.0.0
- pnpm >= 8.0.0

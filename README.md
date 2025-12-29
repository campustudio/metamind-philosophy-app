# 元思想 (Yuansixiang)

教育陪伴平台 - 微信小程序 + H5 多端应用

## 技术栈

### 前端

- **框架**: Taro 3.x + React 18 + TypeScript
- **状态管理**: Redux Toolkit
- **UI 组件**: NutUI 4.x
- **样式**: Tailwind CSS + SCSS
- **数据验证**: Zod
- **国际化**: i18next + react-i18next

### 后端

- **框架**: Nest.js + TypeScript
- **数据库**: MongoDB + Mongoose
- **认证**: JWT
- **验证**: class-validator

### 部署

- **容器化**: Docker
- **CI/CD**: GitHub Actions
- **云服务**: 阿里云 (ECS + OSS + CDN + MongoDB)

## 项目结构

```
yuansixiang/
├── packages/
│   ├── app/                 # Taro 应用（小程序 + H5）
│   ├── shared/              # 共享代码（类型、schemas、i18n）
│   └── server/              # 后端 API 服务
├── pnpm-workspace.yaml      # Monorepo 配置
└── package.json
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

## 服务管理

### 启动服务

#### 1. 启动 MongoDB 数据库

```bash
# 使用 Homebrew 启动
brew services start mongodb-community

# 或使用 Docker 启动
docker-compose up -d
```

#### 2. 启动后端 API 服务

```bash
# 在项目根目录执行
pnpm dev:server

# 服务地址：http://localhost:3000/api
# API 健康检查：http://localhost:3000/api/health
```

#### 3. 启动前端 H5 应用

```bash
# 在项目根目录执行
pnpm dev:h5

# 服务地址：http://localhost:10086
```

#### 4. 启动微信小程序

```bash
# 在项目根目录执行
pnpm dev:weapp

# 使用微信开发者工具打开 packages/app 目录
```

#### 一键启动所有服务

```bash
# 1. 启动 MongoDB
brew services start mongodb-community

# 2. 启动后端（推荐新开终端）
pnpm dev:server

# 3. 启动前端 H5（推荐新开终端）
pnpm dev:h5
```

### 关闭服务

#### 关闭 MongoDB

```bash
# 使用 Homebrew 关闭
brew services stop mongodb-community

# 或关闭 Docker 容器
docker-compose down
```

#### 关闭后端服务

```bash
# 方法1：按进程名关闭
pkill -f "nest start"

# 方法2：按端口关闭
lsof -ti:3000 | xargs kill -9
```

#### 关闭前端 H5 服务

```bash
# 方法1：按进程名关闭
pkill -f "taro build"

# 方法2：按端口关闭
lsof -ti:10086 | xargs kill -9
```

#### 一键关闭所有服务

```bash
# 关闭前端
pkill -f "taro build"
lsof -ti:10086 | xargs kill -9

# 关闭后端
pkill -f "nest start"
lsof -ti:3000 | xargs kill -9

# 关闭 MongoDB
brew services stop mongodb-community
```

### 检查服务状态

```bash
# 检查端口占用情况
lsof -i:3000,10086,27017

# 检查 MongoDB 状态
brew services list | grep mongodb

# 检查进程状态
ps aux | grep -E "nest|taro|mongod" | grep -v grep

# 测试后端 API
curl http://localhost:3000/api/health

# 测试前端 H5
curl -I http://localhost:10086
```

### 构建生产版本

```bash
# 微信小程序
pnpm build:weapp

# H5
pnpm build:h5

# 后端
pnpm build:server
```

## 开发规范

- 使用 TypeScript 严格模式
- 遵循 ESLint 和 Prettier 规范
- 提交前运行 `pnpm lint` 和 `pnpm type-check`
- 使用 Conventional Commits 规范提交信息

## 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

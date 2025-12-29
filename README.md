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

### 开发

```bash
# 微信小程序
pnpm dev:app

# H5
pnpm dev:h5

# 后端 API
pnpm dev:server
```

### 构建

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

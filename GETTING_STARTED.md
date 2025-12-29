# 开始使用元思想项目

## 前置要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- 微信开发者工具（开发小程序）

## 快速开始

### 1. 安装依赖

```bash
# 安装 pnpm（如果还没有）
npm install -g pnpm

# 安装项目依赖
pnpm install
```

### 2. 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env
cp packages/app/.env.example packages/app/.env

# 编辑 .env 文件，填入你的配置
```

### 3. 启动本地开发环境

#### 启动 MongoDB（使用 Docker）

```bash
docker-compose up -d
```

或者使用本地 MongoDB：
```bash
# macOS
brew services start mongodb-community

# 检查状态
brew services list
```

#### 开发小程序

```bash
# 启动小程序开发模式
pnpm dev:app

# 用微信开发者工具打开 packages/app 目录
```

#### 开发 H5

```bash
# 启动 H5 开发模式
pnpm dev:h5

# 浏览器访问 http://localhost:10086
```

#### 开发后端（后续创建）

```bash
# 启动后端开发模式
pnpm dev:server
```

### 4. 项目结构说明

```
yuansixiang/
├── packages/
│   ├── shared/              # 共享代码
│   │   ├── src/
│   │   │   ├── types/      # TypeScript 类型定义
│   │   │   ├── schemas/    # Zod 验证 schemas
│   │   │   ├── constants/  # 常量配置
│   │   │   └── i18n/       # 国际化配置和翻译文件
│   │   └── package.json
│   │
│   ├── app/                # Taro 应用（小程序 + H5）
│   │   ├── src/
│   │   │   ├── pages/      # 页面
│   │   │   ├── components/ # 组件
│   │   │   ├── store/      # Redux store
│   │   │   ├── services/   # API 服务
│   │   │   ├── hooks/      # 自定义 Hooks
│   │   │   ├── styles/     # 全局样式
│   │   │   ├── i18n/       # i18n 初始化
│   │   │   ├── app.tsx     # 应用入口
│   │   │   └── app.config.ts
│   │   ├── config/         # Taro 配置
│   │   └── package.json
│   │
│   └── server/             # 后端服务（待创建）
│       └── ...
│
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD 配置
├── docker-compose.yml      # Docker 配置
├── pnpm-workspace.yaml     # Monorepo 配置
└── package.json
```

## 技术栈

### 前端
- **框架**: Taro 3.x + React 18 + TypeScript
- **状态管理**: Redux Toolkit
- **UI 组件**: NutUI 4.x
- **样式**: Tailwind CSS + SCSS
- **验证**: Zod
- **国际化**: i18next

### 后端（待实现）
- **框架**: Nest.js
- **数据库**: MongoDB + Mongoose
- **认证**: JWT

## 开发规范

### Git 提交规范

使用 Conventional Commits：

```
feat: 添加新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
test: 测试相关
chore: 构建/工具链相关
```

### 代码规范

- 使用 TypeScript 严格模式
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码
- 提交前运行：`pnpm lint` 和 `pnpm type-check`

### 国际化

所有用户可见的文本必须使用 i18n：

```tsx
import { useTranslation } from 'react-i18next'

const { t } = useTranslation()

// 使用翻译
<Text>{t('common:button.submit')}</Text>
```

翻译文件位置：
- `packages/shared/src/i18n/locales/zh-CN/`
- `packages/shared/src/i18n/locales/en/`

## 常用命令

```bash
# 开发
pnpm dev:app      # 小程序开发
pnpm dev:h5       # H5 开发
pnpm dev:server   # 后端开发

# 构建
pnpm build:weapp  # 构建小程序
pnpm build:h5     # 构建 H5
pnpm build:server # 构建后端

# 代码检查
pnpm lint         # 运行 ESLint
pnpm type-check   # TypeScript 类型检查
```

## 下一步

1. **完成后端开发** - 创建 Nest.js 后端项目
2. **配置微信小程序** - 在微信公众平台注册小程序，配置 AppID
3. **配置阿里云** - 设置 OSS、CDN 等服务
4. **实现业务功能** - 根据 Figma 设计稿开发各个模块

## 问题排查

### 依赖安装失败

```bash
# 清理缓存重新安装
pnpm store prune
rm -rf node_modules
pnpm install
```

### 小程序编译错误

- 确保微信开发者工具已安装
- 检查 `project.config.json` 中的 AppID
- 确认 Taro CLI 版本与项目配置匹配

### H5 样式问题

- Tailwind 样式在小程序中部分不可用，使用时注意兼容性
- 复杂样式使用 SCSS 编写

## 参考文档

- [Taro 文档](https://taro-docs.jd.com/)
- [Redux Toolkit 文档](https://redux-toolkit.js.org/)
- [NutUI 文档](https://nutui.jd.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [i18next 文档](https://www.i18next.com/)

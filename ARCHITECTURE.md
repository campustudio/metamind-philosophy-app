# 元思想项目架构文档

## 技术栈总览

```
┌─────────────────────────────────────────────────────────┐
│                    前端层 (Taro)                         │
├─────────────────────────────────────────────────────────┤
│ • 微信小程序 (WeApp)                                     │
│ • H5 Web 应用                                            │
│ • React 18 + TypeScript                                 │
│ • Redux Toolkit (状态管理)                              │
│ • NutUI (UI 组件库)                                      │
│ • Tailwind CSS + SCSS (样式)                            │
│ • i18next (国际化，支持 RTL)                            │
│ • Zod (前端验证)                                         │
└─────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────┐
│                 共享层 (Shared)                          │
├─────────────────────────────────────────────────────────┤
│ • TypeScript 类型定义                                    │
│ • Zod Schemas (前后端共享)                               │
│ • API 常量和配置                                         │
│ • i18n 翻译文件 (zh-CN, en, ar, he...)                  │
└─────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────┐
│                 后端层 (Nest.js) - 待实现                │
├─────────────────────────────────────────────────────────┤
│ • Nest.js + TypeScript                                  │
│ • MongoDB + Mongoose                                    │
│ • JWT 认证                                               │
│ • class-validator (后端验证)                            │
└─────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────┐
│                    数据库层                              │
├─────────────────────────────────────────────────────────┤
│ • MongoDB 6.x                                           │
│ • 阿里云 MongoDB 云服务 (生产)                           │
└─────────────────────────────────────────────────────────┘
```

## 部署架构

```
┌──────────────┐
│ 微信开发者工具 │ → 微信小程序平台
└──────────────┘

┌──────────────┐
│   H5 构建     │ → 阿里云 OSS + CDN
└──────────────┘

┌──────────────┐
│ 后端 Docker   │ → 阿里云 ECS/ACK
└──────────────┘

┌──────────────┐
│   MongoDB     │ → 阿里云 MongoDB 托管
└──────────────┘
```

## Monorepo 结构

```
yuansixiang/
├── packages/
│   ├── shared/          # 共享代码包
│   │   ├── src/
│   │   │   ├── types/       # 接口类型定义
│   │   │   ├── schemas/     # Zod 验证规则
│   │   │   ├── constants/   # 常量配置
│   │   │   └── i18n/        # 国际化配置
│   │   └── package.json
│   │
│   ├── app/             # Taro 应用 (小程序 + H5)
│   │   ├── src/
│   │   │   ├── pages/       # 页面组件
│   │   │   ├── components/  # 可复用组件
│   │   │   ├── store/       # Redux store
│   │   │   │   ├── index.ts
│   │   │   │   └── slices/  # Redux slices
│   │   │   ├── services/    # API 服务封装
│   │   │   ├── hooks/       # 自定义 Hooks
│   │   │   ├── styles/      # 全局样式
│   │   │   ├── i18n/        # i18n 初始化
│   │   │   ├── app.tsx
│   │   │   └── app.config.ts
│   │   ├── config/          # Taro 编译配置
│   │   ├── tailwind.config.js
│   │   └── package.json
│   │
│   └── server/          # 后端服务 (待创建)
│       └── ...
│
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions CI/CD
│
├── docker-compose.yml       # 本地开发环境
├── pnpm-workspace.yaml      # Monorepo 配置
├── package.json             # 根 package.json
├── tsconfig.json            # 根 TypeScript 配置
├── .eslintrc.js             # ESLint 配置
├── .prettierrc              # Prettier 配置
├── .gitignore
├── README.md                # 项目说明
├── GETTING_STARTED.md       # 快速开始指南
└── ARCHITECTURE.md          # 本文档
```

## 核心特性

### 1. Redux Toolkit 状态管理

```typescript
// 定义 slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { ... },
  extraReducers: (builder) => { ... }
})

// 使用
const dispatch = useAppDispatch()
const user = useAppSelector(state => state.auth.user)
```

### 2. 国际化 (i18n)

**支持语言：**
- 中文简体 (zh-CN)
- English (en)
- العربية (ar) - RTL
- עברית (he) - RTL

**使用方式：**
```typescript
const { t } = useTranslation()
<Text>{t('common:button.submit')}</Text>
```

**RTL 支持：**
- 自动检测语言方向
- CSS 逻辑属性 (margin-inline-start 等)
- Tailwind CSS RTL 插件

### 3. Zod 数据验证

**共享 Schema：**
```typescript
// packages/shared/src/schemas/user.schema.ts
export const loginSchema = z.object({
  phone: z.string().regex(/^1[3-9]\d{9}$/),
  code: z.string().length(6)
})

// 前端使用
const result = loginSchema.safeParse(formData)
```

### 4. Tailwind CSS + SCSS 混合

**简单布局用 Tailwind：**
```tsx
<View className="flex items-center px-4 py-2">
```

**复杂组件用 SCSS：**
```scss
.video-player {
  &__controls { ... }
}
```

### 5. API 请求封装

```typescript
// services/request.ts 统一封装
export const request = async (options) => {
  // 自动添加 token
  // 统一错误处理
  // 401 自动跳转登录
}
```

## 开发工作流

### 本地开发

```bash
# 1. 安装依赖
pnpm install

# 2. 启动 MongoDB
docker-compose up -d

# 3. 开发小程序
pnpm dev:app

# 4. 开发 H5
pnpm dev:h5
```

### 代码提交

```bash
# 1. 格式化和检查
pnpm lint
pnpm type-check

# 2. 提交 (遵循 Conventional Commits)
git commit -m "feat: 添加用户登录功能"
```

### 部署流程

```bash
# 1. 推送代码到 main 分支
git push origin main

# 2. GitHub Actions 自动触发
#    - Lint & Type Check
#    - 构建小程序
#    - 构建和部署 H5 到 OSS
#    - 构建和部署后端到 ECS
```

## 性能优化策略

### 前端

1. **按需加载**
   - 路由懒加载
   - 组件懒加载

2. **Tailwind CSS 优化**
   - PurgeCSS 去除未使用样式
   - 小程序包体积控制

3. **图片优化**
   - WebP 格式
   - 阿里云 OSS 图片处理

4. **缓存策略**
   - localStorage/Storage 缓存
   - CDN 缓存

### 后端

1. **数据库优化**
   - 索引优化
   - 查询优化

2. **API 响应**
   - 数据分页
   - 字段过滤

3. **缓存**
   - Redis 缓存热点数据

## 安全考虑

1. **认证授权**
   - JWT Token
   - Token 刷新机制

2. **数据验证**
   - 前端：Zod
   - 后端：class-validator

3. **敏感信息**
   - 环境变量管理
   - 不提交 .env 文件

4. **API 安全**
   - HTTPS
   - Rate Limiting
   - CORS 配置

## 扩展性设计

### 添加新页面

```bash
# 1. 创建页面文件
packages/app/src/pages/new-page/
├── index.tsx
├── index.config.ts
└── index.scss

# 2. 在 app.config.ts 注册路由
pages: ['pages/new-page/index']
```

### 添加新语言

```bash
# 1. 创建翻译文件
packages/shared/src/i18n/locales/fr/
├── index.ts
├── common.json
└── auth.json

# 2. 在 config.ts 注册语言
export const LANGUAGES = {
  ...
  fr: { name: 'Français', dir: 'ltr' }
}
```

### 添加新 Redux Slice

```bash
# 创建 slice
packages/app/src/store/slices/course.slice.ts

# 在 store/index.ts 注册
reducer: {
  course: courseReducer
}
```

## 监控和日志

### 应用监控
- 阿里云 ARMS

### 错误追踪
- Sentry

### 日志管理
- 阿里云日志服务 SLS

## 下一步开发计划

1. ✅ 完成项目初始化和架构搭建
2. ⏳ 创建 Nest.js 后端项目
3. ⏳ 实现用户认证模块
4. ⏳ 实现课程/视频模块
5. ⏳ 实现论坛/社区模块
6. ⏳ 集成明镜平台（ChatGPT）
7. ⏳ 配置阿里云服务
8. ⏳ 性能优化和测试
9. ⏳ 上线部署

## 常见问题

### Q: 为什么选择 Monorepo？
A: 便于前后端代码复用，统一管理依赖，原子性提交。

### Q: 小程序和 H5 如何共享代码？
A: 通过 Taro 框架一套代码多端编译，共享逻辑放在 shared 包。

### Q: 如何处理小程序包体积限制？
A: 分包加载、按需引入、代码分割、图片外链。

### Q: RTL 语言如何测试？
A: 切换到阿拉伯语或希伯来语，检查布局是否镜像翻转。

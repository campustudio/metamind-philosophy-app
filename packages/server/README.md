# 元思想后端服务

基于 Nest.js + MongoDB 的 RESTful API 服务。

## 技术栈

- **Nest.js 10** - 渐进式 Node.js 框架
- **MongoDB + Mongoose** - 数据库和 ODM
- **JWT** - 身份认证
- **Passport** - 认证中间件
- **class-validator** - 数据验证
- **bcrypt** - 密码加密

## 项目结构

```
src/
├── main.ts                 # 应用入口
├── app.module.ts           # 根模块
├── app.controller.ts       # 根控制器
├── app.service.ts          # 根服务
└── modules/
    ├── auth/               # 认证模块
    │   ├── auth.module.ts
    │   ├── auth.service.ts
    │   ├── auth.controller.ts
    │   ├── strategies/     # Passport 策略
    │   │   └── jwt.strategy.ts
    │   └── guards/         # 守卫
    │       └── jwt-auth.guard.ts
    └── user/               # 用户模块
        ├── user.module.ts
        ├── user.service.ts
        ├── user.controller.ts
        └── user.schema.ts
```

## 快速开始

### 1. 环境配置

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 填入配置
# 必填项：
# - MONGODB_URI
# - JWT_SECRET
```

### 2. 启动 MongoDB

```bash
# 使用 Docker Compose（推荐）
cd ../..
docker-compose up -d

# 或使用本地 MongoDB
brew services start mongodb-community
```

### 3. 启动开发服务器

```bash
# 从根目录运行
pnpm dev:server

# 或在当前目录
pnpm start:dev
```

服务将运行在 `http://localhost:3000`

## API 接口

### 健康检查

```http
GET /api/health
```

### 认证接口

#### 手机号验证码登录

```http
POST /api/auth/login
Content-Type: application/json

{
  "phone": "13800138000",
  "code": "123456"
}
```

响应：

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f5e6e6a1b2c3d4e5f6g7h8",
    "phone": "13800138000",
    "nickname": "用户8000",
    "avatar": null
  }
}
```

#### 密码登录

```http
POST /api/auth/login/password
Content-Type: application/json

{
  "phone": "13800138000",
  "password": "your_password"
}
```

### 用户接口

所有用户接口需要在 Header 中携带 JWT Token：

```
Authorization: Bearer <token>
```

#### 获取用户信息

```http
GET /api/user/profile
Authorization: Bearer <token>
```

#### 更新用户信息

```http
PATCH /api/user/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "nickname": "新昵称",
  "avatar": "https://example.com/avatar.jpg"
}
```

## 开发命令

```bash
# 开发模式（热重载）
pnpm start:dev

# 生产构建
pnpm build

# 启动生产版本
pnpm start:prod

# 代码检查
pnpm lint

# 运行测试
pnpm test

# 测试覆盖率
pnpm test:cov
```

## Docker 部署

### 构建镜像

```bash
# 在项目根目录执行
docker build -f packages/server/Dockerfile -t yuansixiang-api .
```

### 运行容器

```bash
docker run -d \
  --name yuansixiang-api \
  -p 3000:3000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/yuansixiang \
  -e JWT_SECRET=your-secret-key \
  yuansixiang-api
```

## 数据模型

### User（用户）

```typescript
{
  phone: string          // 手机号（唯一）
  password?: string      // 密码（可选）
  nickname?: string      // 昵称
  avatar?: string        // 头像 URL
  email?: string         // 邮箱
  role: string           // 角色（默认：user）
  isActive: boolean      // 是否激活
  openid?: string        // 微信 openid
  unionid?: string       // 微信 unionid
  lastLoginAt?: Date     // 最后登录时间
  createdAt: Date        // 创建时间
  updatedAt: Date        // 更新时间
}
```

## 扩展功能

### 添加新模块

```bash
# 使用 Nest CLI 生成模块
nest g module modules/course
nest g controller modules/course
nest g service modules/course
```

### 添加新接口

在对应的 Controller 中添加装饰器：

```typescript
@Get('list')
async getList(@Query() query: any) {
  return this.courseService.findAll(query);
}
```

### 添加守卫保护

```typescript
@UseGuards(JwtAuthGuard)
@Get('protected')
async protectedRoute(@Request() req) {
  return { userId: req.user.userId };
}
```

## 常见问题

### 1. MongoDB 连接失败

检查：

- MongoDB 是否启动
- MONGODB_URI 配置是否正确
- 网络连接是否正常

### 2. JWT Token 验证失败

检查：

- JWT_SECRET 是否配置
- Token 是否过期
- Authorization Header 格式是否正确

### 3. 端口被占用

修改 `.env` 中的 `PORT` 配置或停止占用端口的进程。

## 下一步开发

- [ ] 完善短信验证码发送功能
- [ ] 添加微信小程序登录
- [ ] 实现课程管理模块
- [ ] 实现论坛/社区模块
- [ ] 添加文件上传（阿里云 OSS）
- [ ] 实现数据分页和过滤
- [ ] 添加日志记录
- [ ] 完善错误处理
- [ ] 编写单元测试
- [ ] API 文档（Swagger）

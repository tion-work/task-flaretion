# Flaretion Core Web

这是 Flaretion Core 的前端项目，使用 Next.js 14 + TypeScript + Tailwind CSS 构建。

## 🚀 功能特性

- **用户认证**: 登录、注册、JWT令牌管理
- **项目管理**: 创建、编辑、删除、查看项目
- **响应式设计**: 支持移动端和桌面端
- **现代化UI**: 使用 Tailwind CSS 构建美观界面
- **类型安全**: 完整的 TypeScript 支持

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **状态管理**: React Hooks
- **表单处理**: React Hook Form
- **HTTP客户端**: Axios
- **图标**: Lucide React
- **通知**: React Hot Toast

## 📦 安装依赖

```bash
cd web/task
npm install
# 或
yarn install
# 或
pnpm install
```

## 🔧 环境配置

创建 `.env.local` 文件：

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## 🚀 开发运行

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

应用将在 [http://localhost:3000](http://localhost:3000) 启动

## 📱 页面结构

- **`/`** - 登录/注册页面
- **`/dashboard`** - 项目仪表板（需要认证）

## 🔌 API 集成

前端与后端 API 完全集成：

- **认证端点**: `/api/v1/auth/*`
- **项目端点**: `/api/v1/projects/*`
- **健康检查**: `/health`

## 🎨 组件设计

### 通用组件
- 按钮组件 (btn-primary, btn-secondary)
- 输入框组件 (input-field)
- 卡片组件 (card)

### 页面组件
- 认证表单 (登录/注册)
- 项目列表
- 项目创建/编辑模态框

## 📱 响应式设计

- 移动端优先设计
- 支持平板和桌面端
- 使用 Tailwind CSS 断点系统

## 🔒 安全特性

- JWT 令牌认证
- 自动令牌过期处理
- 受保护的路由
- 安全的 API 调用

## 🚀 构建部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint
```

## 🌐 部署选项

- **Vercel** - 推荐，零配置部署
- **Netlify** - 支持静态导出
- **Railway** - 全栈部署
- **Docker** - 容器化部署

## 🔧 开发工具

- **ESLint** - 代码质量检查
- **TypeScript** - 类型检查
- **Tailwind CSS** - 样式开发
- **React DevTools** - React 调试

## 📚 学习资源

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [React Hook Form 文档](https://react-hook-form.com/)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License

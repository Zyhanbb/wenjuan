# 问卷填写客户端 (wenjuan-client)

基于 Next.js 构建的问卷填写客户端，提供问卷展示、填写、提交等功能。

## 🎯 功能特性

### 问卷展示
- ✅ 问卷详情展示
- ✅ 响应式设计
- ✅ 问卷状态检查（已删除、未发布）
- ✅ SEO 优化

### 问卷填写
- ✅ 多种题型支持
- ✅ 表单验证
- ✅ 答案收集
- ✅ 提交状态反馈

### 用户体验
- ✅ 加载状态提示
- ✅ 错误页面处理
- ✅ 成功/失败页面
- ✅ 移动端适配

## 🛠️ 技术栈

- **Next.js 13** - React 全栈框架
- **TypeScript** - 类型安全
- **Sass** - CSS 预处理器
- **Server-Side Rendering** - 服务端渲染

## 📁 项目结构

```
wenjuan-client/
├── src/
│   ├── components/          # 通用组件
│   │   ├── PageWrapper.tsx  # 页面包装器
│   │   └── QuestionComponents/  # 问卷组件
│   │       ├── QuestionTitle.tsx
│   │       ├── QuestionInput.tsx
│   │       ├── QuestionRadio.tsx
│   │       ├── QuestionCheckbox.tsx
│   │       ├── QuestionTextarea.tsx
│   │       ├── QuestionParagraph.tsx
│   │       └── QuestionInfo.tsx
│   ├── pages/              # 页面路由
│   │   ├── index.tsx       # 首页
│   │   ├── about.tsx       # 关于页面
│   │   ├── success.tsx     # 提交成功页面
│   │   ├── fail.tsx       # 提交失败页面
│   │   ├── question/       # 问卷相关页面
│   │   │   └── [id].tsx    # 问卷详情页（动态路由）
│   │   └── api/            # API 路由
│   │       ├── answer.ts   # 答案提交接口
│   │       └── hello.ts    # 测试接口
│   ├── services/           # API 服务
│   │   ├── ajax.ts        # HTTP 请求封装
│   │   ├── question.ts   # 问卷相关接口
│   │   └── answer.ts     # 答案提交接口
│   ├── styles/            # 样式文件
│   │   ├── globals.css   # 全局样式
│   │   ├── Home.module.css # 首页样式
│   │   ├── Question.module.scss # 问卷样式
│   │   └── Common.module.scss # 通用样式
│   └── public/            # 静态资源
│       ├── data/          # 数据文件
│       └── favicon.ico
├── next.config.js         # Next.js 配置
├── package.json
└── README.md
```

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3002](http://localhost:3002) 查看应用。

### 其他命令

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 📋 页面路由

### 主要页面

#### 首页
- **路径**: `/`
- **功能**: 项目介绍和导航

#### 问卷详情页
- **路径**: `/question/[id]`
- **功能**: 问卷展示和填写
- **特性**: 服务端渲染，SEO 优化

#### 提交结果页
- **路径**: `/success` | `/fail`
- **功能**: 提交成功/失败反馈

### API 路由

#### 答案提交接口
- **路径**: `/api/answer`
- **方法**: POST
- **功能**: 处理问卷答案提交

## 🎨 组件系统

### 问卷组件

#### 文本显示组件
- **QuestionTitle**: 标题组件
- **QuestionParagraph**: 段落组件
- **QuestionInfo**: 信息展示组件

#### 用户输入组件
- **QuestionInput**: 单行文本输入
- **QuestionTextarea**: 多行文本输入

#### 用户选择组件
- **QuestionRadio**: 单选题
- **QuestionCheckbox**: 多选题

### 组件特性

- 统一的组件接口
- 响应式设计
- 表单验证
- 无障碍访问支持

## 🔧 开发指南

### 服务端渲染

问卷页面使用 SSR 进行服务端渲染：

```typescript
// pages/question/[id].tsx
export async function getServerSideProps(context: any) {
  const { id = '' } = context.params
  const data = await getQuestionById(id)
  return {
    props: data
  }
}
```

### 动态路由

使用 Next.js 动态路由处理问卷 ID：

```typescript
// pages/question/[id].tsx
export default function Question(props: PropsType) {
  // 问卷展示逻辑
}
```

### API 路由

使用 Next.js API 路由处理答案提交：

```typescript
// pages/api/answer.ts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(200).json({ errno: -1, msg: 'Method 错误' })
  }
  
  // 处理答案提交
  const answerInfo = genAnswerInfo(req.body)
  // ...
}
```

### 样式管理

使用 CSS Modules 和 Sass：

```scss
// styles/Question.module.scss
.componentWrapper {
  margin-bottom: 16px;
  
  .submitBtnContainer {
    text-align: center;
    margin-top: 24px;
  }
}
```

## 📊 数据流

### 问卷加载流程
1. 用户访问问卷链接
2. 服务端获取问卷数据
3. 渲染问卷页面
4. 客户端水合

### 答案提交流程
1. 用户填写问卷
2. 表单验证
3. 提交到 `/api/answer`
4. 处理答案数据
5. 重定向到结果页面

## 🔌 环境配置

### 开发环境
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 生产环境
```bash
# .env.production
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## 🚀 部署

### 构建生产版本

```bash
npm run build
```

### 部署到 Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 部署到其他平台

将构建后的文件部署到支持 Node.js 的平台：

- Vercel
- Netlify
- AWS
- 阿里云
- 腾讯云

## 📱 响应式设计

### 移动端适配
- 使用 CSS Grid 和 Flexbox
- 触摸友好的交互
- 适配不同屏幕尺寸

### 性能优化
- 图片懒加载
- 代码分割
- 静态资源优化

## 🔍 SEO 优化

### 页面元数据
```typescript
// pages/question/[id].tsx
<Head>
  <title>{title}</title>
  <meta name="description" content={desc} />
</Head>
```

### 结构化数据
支持搜索引擎结构化数据标记。

## 🧪 测试

### 单元测试
```bash
npm test
```

### 端到端测试
使用 Playwright 或 Cypress 进行端到端测试。

## 🔒 安全考虑

### 输入验证
- 表单数据验证
- XSS 防护
- CSRF 防护

### 数据安全
- 敏感数据加密
- 安全的 API 调用

## 📊 性能监控

### 性能指标
- 页面加载时间
- 首屏渲染时间
- 交互响应时间

### 监控工具
- Web Vitals
- Google Analytics
- 自定义监控

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。
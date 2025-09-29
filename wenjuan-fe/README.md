# 问卷管理后台 (wenjuan-fe)

基于 React + TypeScript 构建的问卷管理后台系统，提供问卷创建、编辑、发布、统计等完整功能。

## 🎯 功能特性

### 用户管理
- ✅ 用户注册/登录
- ✅ 用户信息管理
- ✅ 记住登录状态

### 问卷管理
- ✅ 问卷创建和编辑
- ✅ 问卷列表管理（我的问卷、星标问卷、回收站）
- ✅ 问卷搜索和筛选
- ✅ 问卷复制功能
- ✅ 问卷发布/下线
- ✅ 问卷删除（软删除/彻底删除）
- ✅ AI智能生成问卷模板（基于用户需求自动生成问卷结构）

### 问卷编辑器
- ✅ 拖拽式组件编辑器
- ✅ 多种题型支持：
  - 文本显示：标题、段落、信息展示
  - 用户输入：单行文本、多行文本
  - 用户选择：单选、多选
- ✅ 实时预览
- ✅ 撤销/重做功能
- ✅ 组件属性配置
- ✅ AI智能生成组件（根据需求自动生成问卷组件）

### 数据统计
- ✅ 答卷数据收集
- ✅ 统计图表展示
- ✅ 组件级数据统计
- ✅ 数据导出功能

## 🛠️ 技术栈

- **React 18** - 用户界面框架
- **TypeScript** - 类型安全
- **Ant Design 5** - UI 组件库
- **Redux Toolkit** - 状态管理
- **React Router 6** - 路由管理
- **ahooks** - React Hooks 库
- **Sass** - CSS 预处理器
- **Storybook** - 组件开发工具

## 📁 项目结构

```
wenjuan-fe/
├── src/
│   ├── components/          # 通用组件
│   │   ├── QuestionComponents/  # 问卷组件库
│   │   ├── DragSortable/        # 拖拽排序组件
│   │   ├── QuestionTitleModal.tsx # AI生成问卷弹窗
│   │   └── ...
│   ├── pages/              # 页面组件
│   │   ├── Home.tsx        # 首页
│   │   ├── Login.tsx       # 登录页
│   │   ├── Register.tsx    # 注册页
│   │   ├── manage/         # 管理页面
│   │   │   ├── List.tsx    # 问卷列表
│   │   │   ├── Star.tsx    # 星标问卷
│   │   │   └── Trash.tsx   # 回收站
│   │   └── question/       # 问卷相关页面
│   │       ├── Edit/       # 问卷编辑
│   │       └── Stat/       # 数据统计
│   ├── services/           # API 服务
│   │   ├── ajax.ts        # HTTP 请求封装
│   │   ├── user.ts        # 用户相关接口
│   │   ├── question.ts   # 问卷相关接口（包含AI生成接口）
│   │   └── stat.ts       # 统计相关接口
│   ├── store/             # Redux 状态管理
│   │   ├── index.ts       # Store 配置
│   │   ├── userReducer.ts # 用户状态
│   │   ├── pageInfoReducer.ts # 页面信息状态
│   │   └── componentsReducer/ # 组件状态
│   ├── hooks/             # 自定义 Hooks
│   ├── layouts/           # 布局组件
│   ├── router/            # 路由配置
│   ├── utils/             # 工具函数
│   └── styles/            # 样式文件
├── public/                # 静态资源
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
npm start
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 其他命令

```bash
# 构建生产版本
npm run build

# 运行测试
npm run test

# 代码格式化
npm run format

# 代码检查
npm run lint

# 启动 Storybook
npm run storybook

# 分析构建包大小
npm run analyze
```

## 🎨 组件系统

### 问卷组件类型

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

### 组件开发

使用 Storybook 进行组件开发：

```bash
npm run storybook
```

访问 [http://localhost:6006](http://localhost:6006) 查看组件文档。

## 🔧 开发指南

### 状态管理

使用 Redux Toolkit 进行状态管理：

- `userReducer`: 用户信息状态
- `pageInfoReducer`: 页面信息状态
- `componentsReducer`: 问卷组件状态

### 路由配置

主要路由：
- `/` - 首页
- `/login` - 登录页
- `/register` - 注册页
- `/manage/list` - 问卷列表
- `/manage/star` - 星标问卷
- `/manage/trash` - 回收站
- `/question/edit/:id` - 问卷编辑
- `/question/stat/:id` - 数据统计

### API 接口

所有 API 请求都通过 `services` 目录下的服务文件进行封装：

- `services/user.ts` - 用户相关接口
- `services/question.ts` - 问卷相关接口（包含AI生成接口）
- `services/stat.ts` - 统计相关接口

### AI生成相关接口

- `getQuestionServiceByLLM(id, llm)` - 调用AI生成问卷模板
- 支持降级策略：当AI服务不可用时自动使用模拟数据

### 样式规范

- 使用 Sass 预处理器
- 采用 CSS Modules 避免样式冲突
- 遵循 BEM 命名规范

## 📊 数据流

### 问卷编辑流程
1. 用户创建问卷 → 调用 `createQuestionService`
2. 加载问卷数据 → 调用 `getQuestionService` 或 `getQuestionServiceByLLM`（AI生成）
3. 编辑组件 → 更新 Redux 状态
4. 保存问卷 → 调用 `updateQuestionService`

### AI生成流程
1. 用户点击创建问卷 → 显示 `QuestionTitleModal` 弹窗
2. 用户输入需求描述 → 调用 `getQuestionServiceByLLM`
3. 后端调用AI服务生成问卷模板 → 返回组件列表
4. 前端加载生成的问卷模板 → 进入编辑模式

### 数据统计流程
1. 加载问卷数据 → 调用 `getQuestionService`
2. 加载答卷列表 → 调用 `getQuestionStatListService`
3. 加载组件统计 → 调用 `getComponentStatService`
4. 渲染统计图表

## 🔌 环境配置

### 开发环境
```bash
# .env.development
REACT_APP_API_URL=http://localhost:3001
```

### 生产环境
```bash
# .env.production
REACT_APP_API_URL=https://api.yourdomain.com
```

## 🚀 部署

### 构建生产版本

```bash
npm run build
```

### 部署到服务器

将 `build` 目录下的文件部署到 Web 服务器即可。

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。
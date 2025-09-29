# 模拟后端服务 (wenjuan-mock)

基于 Koa + Mock.js 构建的模拟后端服务，为问卷系统提供完整的 API 接口模拟。

## 🎯 功能特性

### 用户管理接口
- ✅ 用户注册
- ✅ 用户登录
- ✅ 获取用户信息

### 问卷管理接口
- ✅ 问卷列表查询
- ✅ 问卷详情获取
- ✅ 问卷创建
- ✅ 问卷更新
- ✅ 问卷复制
- ✅ 问卷删除
- ✅ AI智能生成问卷模板

### 统计相关接口
- ✅ 答卷列表查询
- ✅ 组件统计数据

### 数据模拟
- ✅ 随机数据生成
- ✅ 分页数据模拟
- ✅ 搜索功能模拟
- ✅ 错误响应模拟

### AI智能生成
- ✅ OpenAI API 集成
- ✅ 智能问卷模板生成
- ✅ 降级策略（API不可用时使用模拟数据）
- ✅ 多种题型自动生成

## 🛠️ 技术栈

- **Koa 2** - Node.js Web 框架
- **Koa Router** - 路由中间件
- **Mock.js** - 数据模拟库
- **Nodemon** - 开发热重载
- **OpenAI API** - AI智能生成服务
- **Axios** - HTTP 客户端
- **JSON5** - JSON 解析库
- **dotenv** - 环境变量管理

## 📁 项目结构

```
wenjuan-mock/
├── mock/                 # Mock 数据配置
│   ├── index.js         # Mock 入口文件
│   ├── user.js          # 用户相关接口
│   ├── question.js      # 问卷相关接口（包含AI生成）
│   ├── stat.js          # 统计相关接口
│   ├── answer.js        # 答案提交接口
│   └── data/            # 数据生成器
│       ├── getQuestionList.js    # 问卷列表数据
│       ├── getComponentList.js   # 组件列表数据
│       └── getStatList.js        # 统计数据
├── services/             # AI 服务模块
│   └── chatgpt.js       # ChatGPT API 服务
├── index.js             # 服务入口文件
├── package.json
└── README.md
```

## 🚀 快速开始

### 环境要求
- Node.js >= 14.0.0
- npm >= 6.0.0
- OpenAI API Key（可选，用于AI生成功能）

### 安装依赖

```bash
npm install
```

### 环境变量配置

创建 `.env` 文件并配置 OpenAI API Key：

```bash
# .env
OPENAI_API_KEY=your_openai_api_key_here
```

**注意**：如果不配置 API Key，系统将使用模拟数据生成问卷模板。

### 启动服务

```bash
# 开发模式（热重载）
npm run dev

# 或者直接启动
node index.js
```

服务启动后访问 [http://localhost:3001](http://localhost:3001)

## 📋 API 接口文档

### 用户相关接口

#### 获取用户信息
```http
GET /api/user/info
```

**响应示例：**
```json
{
  "errno": 0,
  "data": {
    "username": "testuser",
    "nickname": "测试用户"
  }
}
```

#### 用户注册
```http
POST /api/user/register
```

**请求体：**
```json
{
  "username": "testuser",
  "password": "123456",
  "nickname": "测试用户"
}
```

**响应示例：**
```json
{
  "errno": 0
}
```

#### 用户登录
```http
POST /api/user/login
```

**请求体：**
```json
{
  "username": "testuser",
  "password": "123456"
}
```

**响应示例：**
```json
{
  "errno": 0,
  "data": {
    "token": "mock_token_123456"
  }
}
```

### 问卷管理接口

#### 获取问卷列表
```http
GET /api/question?page=1&pageSize=10&keyword=测试
```

**查询参数：**
- `page`: 页码（默认：1）
- `pageSize`: 每页数量（默认：10）
- `keyword`: 搜索关键词（可选）
- `isStar`: 是否星标（可选）
- `isDeleted`: 是否已删除（可选）

**响应示例：**
```json
{
  "errno": 0,
  "data": {
    "list": [
      {
        "_id": "question_001",
        "title": "用户满意度调查",
        "isPublished": true,
        "isStar": false,
        "isDeleted": false,
        "createdAt": "2023-01-01T00:00:00.000Z"
      }
    ],
    "total": 100
  }
}
```

#### 获取问卷详情
```http
GET /api/question/:id
```

**响应示例：**
```json
{
  "errno": 0,
  "data": {
    "id": "question_001",
    "title": "用户满意度调查",
    "desc": "问卷描述",
    "js": "",
    "css": "",
    "isDeleted": false,
    "isPublished": true,
    "componentList": [
      {
        "fe_id": "comp_001",
        "type": "questionTitle",
        "title": "问卷标题",
        "props": {
          "text": "用户满意度调查",
          "level": 1,
          "isCenter": false
        }
      }
    ]
  }
}
```

#### 创建问卷
```http
POST /api/question
```

**响应示例：**
```json
{
  "errno": 0,
  "data": {
    "id": "question_002"
  }
}
```

#### 更新问卷
```http
PATCH /api/question/:id
```

**请求体：**
```json
{
  "title": "更新后的标题",
  "componentList": [...]
}
```

**响应示例：**
```json
{
  "errno": 0
}
```

#### 复制问卷
```http
POST /api/question/duplicate/:id
```

**响应示例：**
```json
{
  "errno": 0,
  "data": {
    "id": "question_003"
  }
}
```

#### 删除问卷
```http
DELETE /api/question
```

**请求体：**
```json
{
  "ids": ["question_001", "question_002"]
}
```

**响应示例：**
```json
{
  "errno": 0
}
```

### 统计相关接口

#### 获取答卷列表
```http
GET /api/stat/:questionId?page=1&pageSize=10
```

**响应示例：**
```json
{
  "errno": 0,
  "data": {
    "total": 50,
    "list": [
      {
        "_id": "answer_001",
        "questionId": "question_001",
        "answerList": [
          {
            "componentId": "comp_001",
            "value": "选项1"
          }
        ]
      }
    ]
  }
}
```

#### 获取组件统计
```http
GET /api/stat/:questionId/:componentId
```

**响应示例：**
```json
{
  "errno": 0,
  "data": {
    "stat": [
      { "name": "选项1", "count": 20 },
      { "name": "选项2", "count": 15 },
      { "name": "选项3", "count": 10 }
    ]
  }
}
```

### 答案提交接口

#### 提交问卷答案
```http
POST /api/answer
```

**请求体：**
```json
{
  "questionId": "question_001",
  "answerList": [
    {
      "componentId": "comp_001",
      "value": "选项1"
    }
  ]
}
```

**响应示例：**
```json
{
  "errno": 0
}
```

### AI生成接口

#### AI智能生成问卷模板
```http
POST /api/question/llm/:id
```

**请求体：**
```json
{
  "llm": "用户需求描述"
}
```

**响应示例：**
```json
{
  "errno": 0,
  "data": {
    "id": "question_001",
    "title": "AI生成的问卷标题",
    "desc": "AI生成的问卷描述",
    "componentList": [
      {
        "fe_id": "c1",
        "type": "questionInfo",
        "title": "问卷信息",
        "props": {
          "title": "问卷标题",
          "desc": "问卷描述"
        }
      }
    ]
  }
}
```

**功能说明：**
- 根据用户输入的需求描述，使用AI自动生成问卷模板
- 支持生成多种题型：单选、多选、输入框、文本域等
- 当API Key未配置时，自动降级为模拟数据生成

## 🔧 配置说明

### 端口配置
默认端口：3001

修改端口：
```javascript
// index.js
const PORT = process.env.PORT || 3001
```

### AI服务配置

#### OpenAI API 配置
```bash
# .env
OPENAI_API_KEY=your_openai_api_key_here
```

#### AI服务模块
- **文件位置**: `services/chatgpt.js`
- **主要功能**: 
  - 调用OpenAI API生成问卷模板
  - 数据验证和格式化
  - 降级策略处理
- **支持的模型**: GPT-3.5-turbo
- **API端点**: `https://api.aikeji.vip/v1/chat/completions`

### 数据配置
在 `mock/data/` 目录下可以配置各种数据生成器：

- `getQuestionList.js` - 问卷列表数据
- `getComponentList.js` - 组件列表数据
- `getStatList.js` - 统计数据

### 错误模拟
可以通过修改 Mock 配置来模拟各种错误情况：

```javascript
// 模拟登录失败
{
  url: '/api/user/login',
  method: 'post',
  response() {
    return {
      errno: 1001,
      msg: '用户名或密码错误'
    }
  }
}
```

## 🎨 数据生成

### Mock.js 配置
使用 Mock.js 生成随机数据：

```javascript
const Mock = require('mockjs')
const Random = Mock.Random

// 生成随机标题
Random.ctitle()

// 生成随机姓名
Random.cname()

// 生成随机ID
Random.id()
```

### 自定义数据生成器
在 `mock/data/` 目录下创建自定义数据生成器：

```javascript
// mock/data/customData.js
const Mock = require('mockjs')
const Random = Mock.Random

module.exports = function(options = {}) {
  return {
    id: Random.id(),
    title: Random.ctitle(),
    // 自定义逻辑
  }
}
```

### AI数据生成

#### 智能问卷生成
使用AI服务生成问卷模板：

```javascript
// services/chatgpt.js
const chatGPTService = require('./services/chatgpt')

// 生成问卷组件
const components = await chatGPTService.generateQuestionnaireComponents('用户需求描述')
```

#### 降级策略
当AI服务不可用时，自动使用模拟数据：

```javascript
// 检查API Key
if (!this.apiKey) {
  return this.getMockComponents(title)
}
```

#### 支持的组件类型
- `questionInfo` - 问卷信息
- `questionTitle` - 标题
- `questionInput` - 输入框
- `questionTextarea` - 多行输入
- `questionParagraph` - 段落
- `questionRadio` - 单选
- `questionCheckbox` - 多选

## 🚀 部署

### 生产环境部署

```bash
# 安装依赖
npm install --production

# 启动服务
node index.js
```

### Docker 部署

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3001
CMD ["node", "index.js"]
```

## 🔍 调试

### 日志输出
服务会输出详细的请求日志：

```
[2023-01-01 10:00:00] GET /api/question - 200
[2023-01-01 10:00:01] POST /api/user/login - 200
```

### 数据查看
可以通过浏览器访问接口查看返回数据：

- [http://localhost:3001/api/question](http://localhost:3001/api/question)
- [http://localhost:3001/api/user/info](http://localhost:3001/api/user/info)

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。


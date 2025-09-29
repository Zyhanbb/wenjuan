# Redux Store 文档

本文档介绍了问卷系统前端项目中 Redux store 的结构、状态变量、方法和 action。

## Store 结构概览

整个 store 由三个主要的 reducer 组成：

- **user**: 用户信息管理
- **components**: 问卷组件管理（支持撤销/重做功能）
- **pageInfo**: 页面信息管理

## 1. User Reducer (`userReducer.ts`)

### 状态变量 (State)

```typescript
type UserStateType = {
  username: string    // 用户名
  nickname: string    // 昵称
}
```

### Actions

| Action 名称 | 描述 | 参数类型 |
|------------|------|----------|
| `loginReducer` | 用户登录，设置用户信息 | `UserStateType` |
| `logoutReducer` | 用户登出，清空用户信息 | 无 |

### 使用示例

```typescript
import { useDispatch } from 'react-redux'
import { loginReducer, logoutReducer } from '../store/userReducer'

// 登录
dispatch(loginReducer({ username: 'user123', nickname: '用户昵称' }))

// 登出
dispatch(logoutReducer())
```

## 2. Components Reducer (`componentsReducer/index.ts`)

### 状态变量 (State)

```typescript
type ComponentsStateType = {
  selectedId: string                    // 当前选中的组件ID
  componentList: ComponentInfoType[]    // 组件列表
  copiedComponent: ComponentInfoType | null  // 复制的组件
}

type ComponentInfoType = {
  fe_id: string        // 前端生成的唯一ID
  type: string         // 组件类型
  title: string        // 组件标题
  isHidden?: boolean   // 是否隐藏
  isLocked?: boolean   // 是否锁定
  props: ComponentPropsType  // 组件属性
}
```

### Actions

| Action 名称 | 描述 | 参数类型 |
|------------|------|----------|
| `resetComponents` | 重置所有组件 | `ComponentsStateType` |
| `changeSelectedId` | 修改选中的组件ID | `string` |
| `addComponent` | 添加新组件 | `ComponentInfoType` |
| `changeComponentProps` | 修改组件属性 | `{ fe_id: string; newProps: ComponentPropsType }` |
| `removeSelectedComponent` | 删除选中的组件 | 无 |
| `changeComponentHidden` | 隐藏/显示组件 | `{ fe_id: string; isHidden: boolean }` |
| `toggleComponentLocked` | 锁定/解锁组件 | `{ fe_id: string }` |
| `copySelectedComponent` | 复制选中的组件 | 无 |
| `pasteCopiedComponent` | 粘贴复制的组件 | 无 |
| `selectPrevComponent` | 选中上一个组件 | 无 |
| `selectNextComponent` | 选中下一个组件 | 无 |
| `changeComponentTitle` | 修改组件标题 | `{ fe_id: string; title: string }` |
| `moveComponent` | 移动组件位置 | `{ oldIndex: number; newIndex: number }` |

### 撤销/重做功能

Components reducer 集成了 `redux-undo` 功能：

- 支持最多 20 步撤销操作
- 排除以下 action 不参与撤销：
  - `components/resetComponents`
  - `components/changeSelectedId`
  - `components/selectPrevComponent`
  - `components/selectNextComponent`

### 使用示例

```typescript
import { useDispatch } from 'react-redux'
import { 
  addComponent, 
  changeSelectedId, 
  removeSelectedComponent,
  copySelectedComponent,
  pasteCopiedComponent 
} from '../store/componentsReducer'

// 添加组件
dispatch(addComponent({
  fe_id: 'comp_123',
  type: 'questionInput',
  title: '输入框',
  props: { placeholder: '请输入内容' }
}))

// 选中组件
dispatch(changeSelectedId('comp_123'))

// 复制组件
dispatch(copySelectedComponent())

// 粘贴组件
dispatch(pasteCopiedComponent())

// 删除选中组件
dispatch(removeSelectedComponent())
```

## 3. Page Info Reducer (`pageInfoReducer.ts`)

### 状态变量 (State)

```typescript
type PageInfoType = {
  title: string           // 页面标题
  desc?: string          // 页面描述
  js?: string            // 自定义JavaScript代码
  css?: string           // 自定义CSS代码
  isPublished?: boolean  // 是否已发布
}
```

### Actions

| Action 名称 | 描述 | 参数类型 |
|------------|------|----------|
| `resetPageInfo` | 重置页面信息 | `PageInfoType` |
| `changePageTitle` | 修改页面标题 | `string` |

### 使用示例

```typescript
import { useDispatch } from 'react-redux'
import { resetPageInfo, changePageTitle } from '../store/pageInfoReducer'

// 重置页面信息
dispatch(resetPageInfo({
  title: '新问卷',
  desc: '问卷描述',
  js: '',
  css: ''
}))

// 修改页面标题
dispatch(changePageTitle('我的问卷'))
```

## 工具函数 (`componentsReducer/utils.ts`)

### `getNextSelectedId(fe_id: string, componentList: ComponentInfoType[])`

计算删除组件后的下一个选中组件ID。

### `insertNewComponent(draft: ComponentsStateType, newComponent: ComponentInfoType)`

在指定位置插入新组件。

## 完整 Store 类型定义

```typescript
export type StateType = {
  user: UserStateType
  components: StateWithHistory<ComponentsStateType>  // 支持撤销/重做
  pageInfo: PageInfoType
}
```

## 使用 Hook 获取状态

```typescript
import { useSelector } from 'react-redux'
import { StateType } from '../store'

// 获取用户信息
const user = useSelector((state: StateType) => state.user)

// 获取组件列表
const components = useSelector((state: StateType) => state.components.present)

// 获取页面信息
const pageInfo = useSelector((state: StateType) => state.pageInfo)
```

## 注意事项

1. **不可变性**: 所有 reducer 都使用 `immer` 的 `produce` 函数来确保状态的不可变性
2. **撤销功能**: Components reducer 支持撤销/重做，但某些 action 不参与撤销历史
3. **组件ID**: 使用 `nanoid` 生成前端唯一的组件ID
4. **深拷贝**: 复制组件时使用 `lodash.clonedeep` 进行深拷贝
5. **拖拽排序**: 使用 `@dnd-kit/sortable` 的 `arrayMove` 函数处理组件位置移动

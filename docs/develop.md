# 开发文档

## 代码规范

### Components

- 组件命名使用PascalCase
- 组件文件名使用kebab-case

### Screens

- 屏幕命名使用PascalCase
- 屏幕文件名使用kebab-case

### Navigators

- 新增Screen需要在MainStackNavigator中注册，根据文件夹目录放置对应的位置

## 数据迁移相关

1. 合并Assistant和Agent为Assistant

## TODO

> 第一期目标: 实现基本的聊天功能，支持上传图片和文档

### UI

- [x] 顶部助手栏
- [ ] Chat/Message相关界面
- [ ] 背景上色

### 数据

- [ ] 支持Cherry Studio客户端数据迁移
  > 使用expo-sqlite + zustand(或者仍旧使用redux)

### 逻辑

- [ ] 使用和客户端相同的中间件架构，通过aiCore调用底层sdk
  > 由于移动端不支持ReadableStream，中间件部分需要一些修改
- [ ] [迁移ApiService](https://github.com/CherryHQ/cherry-studio/blob/main/src/renderer/src/services/ApiService.ts)
- [ ] [迁移messageThunk](https://github.com/CherryHQ/cherry-studio/blob/main/src/renderer/src/store/thunk/messageThunk.ts)

## Problems

### 首页

- [ ] 输入框和键盘动画不跟手(/video/problem1.mov)

### Model Provider

- [ ] 搜索模型时键盘挡住显示区域(/video/problem2.mov)
- [ ] 添加模型时键盘挡住显示区域(/video/problem2.mov)
- [ ] 添加服务商时键盘挡住显示区域(/video/problem3.mov)
- [ ] 模型管理界面Tab无法改变样式

### Default Model

- [x] 模型下拉框样式

### Websearch

- [ ] 黑名单键盘无法自动上移

### Assistant Market

- [ ] Bottom Sheet UI问题(/video/problem4.mov)

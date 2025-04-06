# 瞬影应用视图组件

本目录包含应用的主要视图组件，每个组件对应一个路由页面。

## 当前视图组件

- `HomeView.vue` - 首页，展示横幅、功能区块和热门地点
- `SearchView.vue` - 查找页面，用于搜索照片和内容
- `ExploreView.vue` - 探索页面，发现新的拍摄地点和作品
- `ProfileView.vue` - 个人中心页面，管理用户信息和设置

## 视图组织结构

每个视图组件通常包含：

1. 模板部分 `<template>`：定义页面HTML结构
2. 脚本部分 `<script setup>`：使用Composition API管理组件逻辑
3. 样式部分 `<style scoped>`：组件特定的样式定义

## 公共组件使用

视图组件中可以引用`components`目录下的公共组件：

```vue
<script setup>
import TopBar from '@/components/TopBar.vue'
import TabBar from '@/components/TabBar.vue'
</script>
```

## 视图扩展

添加新视图的步骤：

1. 在此目录中创建新的`.vue`文件
2. 在`router/index.js`中注册对应路由
3. 如果需要在底部导航中显示，需要更新`TabBar.vue`组件 
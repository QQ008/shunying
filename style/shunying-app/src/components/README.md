# 瞬影应用公共组件

本目录包含应用中可复用的公共组件，这些组件在多个视图中共享使用。

## 核心组件

- `TabBar.vue` - 底部导航栏，提供主要页面导航
- `TopBar.vue` - 顶部导航栏，显示应用标识和通知图标

## 其他组件

- 部分组件（如 `HelloWorld.vue`、`TheWelcome.vue` 等）是初始模板中的示例组件，可在正式开发中移除

## 组件使用

在视图组件中导入并使用：

```vue
<template>
  <div class="view">
    <TopBar />
    <div class="content">
      <!-- 页面内容 -->
    </div>
    <TabBar />
  </div>
</template>

<script setup>
import TopBar from '@/components/TopBar.vue'
import TabBar from '@/components/TabBar.vue'
</script>
```

## 组件开发规范

- 组件应遵循单一职责原则，专注于一个特定功能
- 使用props接收数据，使用events发送事件
- 样式使用`scoped`属性以避免样式冲突
- 复杂组件可以拆分为更小的子组件
- 共享逻辑可以提取为可复用的Composables函数 
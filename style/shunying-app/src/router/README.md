# 瞬影应用路由配置

本目录包含应用的路由配置，使用Vue Router管理页面导航。

## 主要文件

- `index.js` - 主路由配置文件，定义了应用的所有路由

## 当前配置的路由

| 路径 | 名称 | 组件 | 标题 |
|------|------|------|------|
| `/` | home | HomeView | 首页 |
| `/search` | search | SearchView | 查找 |
| `/explore` | explore | ExploreView | 探索 |
| `/profile` | profile | ProfileView | 我的 |

## 路由特性

- 使用了`createWebHistory`模式，提供干净的URL
- 实现了路由守卫，自动根据路由元数据设置页面标题
- 对非首页路由使用了懒加载，优化首次加载性能

## 扩展路由

添加新路由的步骤：

1. 在`index.js`中的`routes`数组中添加新的路由配置
2. 在`views`目录中创建对应的视图组件
3. 确保为新路由添加了适当的元数据，如`title`

示例：
```js
{
  path: '/new-route',
  name: 'newRoute',
  component: () => import('../views/NewRouteView.vue'),
  meta: { title: '新页面' }
}
``` 
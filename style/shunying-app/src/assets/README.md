# 瞬影应用静态资源

本目录包含应用中使用的各种静态资源，如样式表、图片和字体等。

## 目录结构

- `main.css` - 全局样式
- `logo-icon.svg` - 应用徽标SVG文件
- 其他图片和UI资源

## 使用指南

- 本目录下的资源可以通过相对路径在组件内部引用
- 样式表可以直接在`main.js`中导入
- SVG图标可以在组件中直接引用

## 注意事项

- 大型图片资源（如横幅、背景等）请放置在`/public/images/`目录下
- 此目录主要存放与应用逻辑紧密相关的资源
- 图标统一使用SVG格式，便于缩放和样式控制 
# 瞬影应用公共图片资源

本目录包含应用中使用的各种公共图片资源，这些资源可以直接通过URL路径访问。

## 目录结构

```
images/
├── icons/           # SVG图标资源
│   ├── calendar.svg # 日历图标
│   ├── trophy.svg   # 奖杯图标
│   ├── search-large.svg # 大型搜索图标
│   └── ...          # 其他图标
├── banner-bg.png    # 首页横幅背景
├── place1.jpg       # 地点图片1
├── place2.jpg       # 地点图片2
└── place3.png       # 地点图片3
```

## 使用指南

- 这些图片可以在组件中通过绝对路径引用，例如：`/images/banner-bg.png`
- 图标统一存放在`icons`子目录中，便于管理

## 图标命名规范

- 功能图标使用功能名称命名，如`search.svg`、`notification.svg`
- 导航图标使用导航项名称，普通状态和激活状态分别命名，如`home.svg`和`home-active.svg`
- 大型图标添加尺寸后缀，如`search-large.svg`

## 图片规格说明

- 横幅图片推荐分辨率：750x295px
- 地点图片推荐分辨率：320x200px
- 图标应使用SVG格式，确保在不同分辨率下显示清晰 
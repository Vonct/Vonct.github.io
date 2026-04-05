# Vonct.github.io

个人作品集站点，适合直接部署到 GitHub Pages。

## 结构

- `index.html`: 首页
- `project.html`: 项目详情页模板
- `content/profile.js`: 个人信息
- `content/projects.js`: 项目数据
- `assets/styles.css`: 样式
- `assets/home.js`: 首页渲染逻辑
- `assets/project.js`: 详情页渲染逻辑

## 你后续只需要改哪里

### 1. 改个人信息

编辑：

- `content/profile.js`

### 2. 新增项目

编辑：

- `content/projects.js`

复制一个对象，修改：

- `slug`
- `name`
- `summary`
- `highlights`
- `stack`
- `sections`

## 部署到 GitHub Pages

如果仓库名是：

- `Vonct.github.io`

那么它会作为你的用户主页站点部署在：

- `https://vonct.github.io`

静态文件放在仓库根目录即可，不需要额外构建步骤。

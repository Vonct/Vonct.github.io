# Vonct.github.io

个人作品集站点，适合直接部署到 GitHub Pages。

## 结构

- `index.html`: 首页
- `project.html`: 项目详情页模板
- `content/profile.js`: 个人信息
- `content/projects.js`: 首页卡片数据和项目元信息
- `content/projects/*.md`: 项目详情正文，适合自己直接改
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
- `content/projects/<slug>.md`

复制一个对象，修改：

- `slug`
- `name`
- `summary`
- `highlights`
- `stack`
- `detailMd`

然后新增对应的 Markdown 文件，把长内容、截图和分节说明写进去。

## 部署到 GitHub Pages

如果仓库名是：

- `Vonct.github.io`

那么它会作为你的用户主页站点部署在：

- `https://vonct.github.io`

静态文件放在仓库根目录即可，不需要额外构建步骤。

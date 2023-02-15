# InkBlogger

> 最深的记忆不如最浅的墨水

## 什么是 InkBlogger？

InkBlogger 是一个基于 Vue3 的个人博客模版，专为想要在 Vue 中编写博客站点并在 Markdown 中撰写帖子的极客而构建。

- 灵活的样式管理，通过事先封装的 CSS 类，你可以灵活地对组件布局与交互效果进行自定义，全局使用的 CSS 变量也支持动态主题切换。
- 统一、简单的用户接口，填写个人信息后你就可以打包并部署在公用(vercel/githubPage/giteePage)或私有服务器中。
- 内置的 Vite 打包优化，即使添加臃肿的资源也能获得不错的页面加载体验。

## InkBlogger 来源

InkBlogger 的灵感来源于优秀的[VueSax](https://vuesax.com/)组件库和[samzhangjy](https://github.com/samzhangjy)的[VueBlogger](https://samzhangjy.github.io/#/)，你能在 InkBlogger 中发现许多它们的影子，它们都是十分优秀的作品，使用着`Vue2`与`webpack`进行构建。

但当我发现它们时，Vue3 已大行其道且`CompositionApi`+`TS`+`Vite`的开发栈已让我无法割舍，便着手开始了重建和改造。在前端技术飞速更迭的背景下，优秀的项目需要更新的技术承载下去，感谢他们为开源社区的付出。

在未来，我会考虑继续使用以 Vue3 为核心的技术栈复现在 19 年停产的[vuesax](https://github.com/lusaxweb/vuesax)项目，它是我见过样式最为优雅美观的组件库。您可以了解并关注我的开发进展。

## 如何使用 InkBlogger？

_注意：确保在继续之前安装了_[_Node.js_](https://nodejs.org/)_和_[_Vue 3_](https://vuejs.org/) 。

### 配置

您需要在使用前配置您的博客。

#### 个人信息配置

在 `/personal Tailor/user.json` 中填写你的个人信息。 例如：

```JSON
{
  "name": "Terry Lee",
  "avatarPath": "../personal Tailor/assets/avatar.png",
  "motto": "THINK TWICE | CODE ONCE",
  "description": "A Little Front-Ender",
  "link": "https://github.com/bullshitking-99",
  "Title": "Lee's Blog",
  "blogStartYear": "2022",
  "contact": {
    "Email": "mailto:liminghe_1999@163.com",
    "Github": "https://github.com/bullshitking-99",
    "JueJin": "https://juejin.cn/user/4402870941397416"
  }
}

```

这些信息都会展示在博客中。

#### post & project 配置

首先，提供需要在您的博客上显示的项目。在`/posts/data/projects.json` 中配置它们，例如：

```JSON
{
  "title": "InkBlogger",
  "img": "../project/assets/InkBlogger.png",
  "description": "最深的记忆不如最浅的墨水",
  "link": "https://github.com/bullshitking-99/InkBlogger"
}
```

#### 个人介绍

您需要提供一个 MarkDown 文件以显示在 About 页面上。 在 Markdown 文件中写一些关于你自己的东西：`personal Tailor/aboutMe.md`

```Markdown
# 👋 Hi, I’m Minghe Lee, a young front-end lover

- 👀 I’m interested in ⌨️coding | 🧑‍🍳cooking | 💪gym and so on...
- 🌱 I am currently studying in a university(BJUT) of China
```

### 展示博客

您可以在 `/posts/` 下以 Markdown 格式撰写您的帖子。 `/posts/`的文件结构如下：

```JSON
posts
├─ assets
├─ posts.json
├─ post-1-title.md
├─ post-2-title
│  ├─ post-2-title.md
│  └─ img
└─ post-3-title
   ├─ post-3-title.md
   └─ img
```

支持文件夹或直接的 markdown 文件，但注意文件夹需与内含的 markdown 文件同名。

填充博客后，您需要进一步配置：`/posts/posts.json`。 写下您想在博客上显示的帖子，并提供一些相关信息。 例如：

```JSON
{
  "title": "InkBlogger: 为所有人建筑的简约博客",
  "tags": ["Vue.js", "project", "frontend"],
  "cover": "../posts/assets/default-vue.png",
  "description": "最深的记忆不如最浅的墨水，使用InkBlogger记录和分享你的技术与生活。",
  "date": "2022-10-6",
  "name": "InkBlogger"
},
```

请注意，`post`的`name`是它的**文件名**，**不是**它的标题。 错误的配置可能会导致对配置错误的帖子的 404 响应。

所以，每次你想发布一个帖子，你都需要将它添加到配置文件中。

### 在本地运行你的博客

使用 `yarn dev`（如果您使用的是 `npm`，则使用 `npm run dev`）启动热重载开发服务器。

### 手动构建你的博客

如果您不使用 GitHub Pages 作为托管服务提供商，则需要手动构建站点。

运行 `yarn build`（或 `npm` 的 `npm run build`）来构建 InkBlogger。

构建后，可以在 `/dist` 目录看到您博客的构建资源（HTML、CSS、JavaScript 等）。

使用`yarn preview`可以在部署至服务器之前提前检查打包效果。

## 最后

如果你喜欢这个项目的话，可以在 GitHub 上 浅 star 一下 ，同时也十分欢迎提交`issue`与`pr`，爱你。

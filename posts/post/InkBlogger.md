# InkBlogger

> 最深的记忆不如最浅的墨水

## 什么是 InkBlogger？

InkBlogger 是一个用于 Vue.js 的轻量级博客站点生成器，专为想要在 Vue 中编写博客站点并在 Markdown 中撰写帖子的极客而构建。

我开发它是有原因的：Vue 并没有真正简单的博客工具。 VuePress 可以工作，但是太复杂了。 因此，出于这个目的，我为 Vue 开发了这个轻量级博客网站：InkBlogger。

您可以将其托管在任何安装了 Nodejs 和 Vue 的服务器上。 实际上，如果您已经在自己的笔记本电脑上构建了博客，则甚至不需要它们：只需直接托管 HTML 和 JavaScript 文件即可！

### InkBlogger 背后

起初，我只是想为自己搭建一个轻量级的博客。 但是，我发现如果我发布源代码并编写有关如何使用它的教程，开发人员可以花更少的时间来构建博客，而花更多的时间来写帖子。

所以我决定让 InkBlogger 开源。 这就是这篇文章出现的原因。

当然，InkBlogger 还不是很完整：可能存在错误，并且 UI 可能无法正常工作。 但是，根据我自己的使用，到目前为止没有任何问题。 我将尝试添加更多功能，并在未来使 InkBlogger 更具可定制性。

## 如何使用 InkBlogger？

_注意：确保在继续之前安装了_[_Node.js_](https://nodejs.org/) 和 [_Vue 3_](https://vuejs.org/)。

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

您需要提供一个 MarkDown 文件以显示在“关于”页面上。 在 Markdown 文件中写一些关于你自己的东西：`personal Tailor/aboutMe.md`

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
├─ post-1-title
│  ├─ post-1-title.md
│  └─ img
├─ post-2-title
│  ├─ post-2-title.md
│  └─ img
└─ post-3-title
   ├─ post-3-title.md
   └─ img
```

是的，您需要对帖子进行多一项配置：`/posts/posts.json`。 写下您想在博客上显示的帖子，并提供一些相关信息。 例如：

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

请注意，`post`的`name`是它的**文件名**，**不是**它的标题。 错误的配置可能会导致对配置错误的帖子的 404 响应。 一定要检查配置！

所以，每次你想发布一个帖子，你都需要将它添加到配置文件中。 否则，它根本不会出现在您的博客中。

### 在本地运行你的博客

使用 `yarn dev`（如果您使用的是 `npm`，则使用 `npm run dev`）在 `localhost:8080` 上启动热重载开发服务器。

### 手动构建你的博客

如果您不使用 GitHub Pages 作为托管服务提供商，则需要手动构建站点。

运行 `yarn build`（或 `npm` 的 `npm run build`）来构建 InkBlogger。

构建后，`/dist` 目录包含您博客的构建资产（HTML、CSS、JavaScript 等）。

## 最后

请在 GitHub 上 star 或 fork InkBlogger 支持我！一如既往，随时报告问题并打开 PR 以帮助开发！

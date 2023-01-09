# novel-translation

## 简介

本项目会翻译一系列小说，并提供了可自定义的网站模板。

现在正在翻译的是鲁迅《呐喊彷徨故事新编》，计划每月一篇文章。

翻译列表：

- [x] 狂人日记
- [ ] 孔乙己

## 特色

![draft](img/draft_2022-01-03.JPG)

- [x] 语言切换：中英双语
- [x] 目录章节跳转
- [x] 注释跳转
- [x] 返回顶端
- [ ] ~~调整字体、字体大小~~

## 自定义模板

### 构建网站

```sh
# clone this project
git clone https://github.com/forestlet/novel-translation.git

# install dependencies
npm install
# or
# yarn install

# run this project
npm run dev
```

### 自定义

替换 public 中的文件

```txt
novel-translation
├─ public
│    ├─ 01 狂人日记
│    │    ├─ A Paranoia's Journals.md
│    │    └─ 狂人日记.md
│    ├─ 02 孔乙己
│    │    ├─ Kong Yiji.md
│    │    └─ 孔乙己.md
│    └─ novels.json
```

novels.json 和目录结构对应

```json
{
  "01 狂人日记": {
    "en": "A Paranoia's Journals",
    "cn": "狂人日记"
  },
  "02 孔乙己": {
    "en": "Kong Yiji",
    "cn": "孔乙己"
  }
}
```

### 注意

1. vite 提示：`Instead of /public/novels.json, put the file in the src directory, and use /src/novels.json instead.` 可以忽略
2. 使用 GitHub Pages 构建时，不能直接 `import` 小说文档，要使用 `fetch`
3. GitHub Pages 上文件格式要设置为 utf-8 with bom 格式而非 utf-8，防止中文乱码
4. GitHub Pages 服务器应该是 Linux，用 `\n` 分句，而不是 `\r\n` （Windows）

## 工具

- [element-plus](https://element-plus.gitee.io/zh-CN/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [vite](https://cn.vitejs.dev/)

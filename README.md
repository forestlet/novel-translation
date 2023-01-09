# novel-translation

![draft](img/draft_2022-01-03.JPG)

- [x] 语言切换：中英双语
- [x] 目录章节跳转
- [x] 注释跳转
- [x] 返回顶端
- [ ] ~~调整字体、字体大小~~

## 翻译列表

- [x] 狂人日记
- [ ] 孔乙己

## 注意

使用 GitHub Pages 构建时：

1. 不能直接 `import` 进小说文档，而要使用 `fetch`
2. utf-8 要转换成 utf-8 with bom 格式，以防止中文乱码
3. 服务器应该是 Linux，所以会用 `\n` 而不是 `\r\n` （Windows）来分段

## 工具

- [element-plus](https://element-plus.gitee.io/zh-CN/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [vite](https://cn.vitejs.dev/)

# clear : fix

一个简单的 [postcss](https://github.com/postcss/postcss) 插件，主要为了说明 postcss 插件是什么，怎么做的。整个项目的代码基本是从 [postcss-clearfix](https://github.com/seaneking/postcss-clearfix) 复制过来的，因为感觉这个是最简单易懂且贴近需求的一个插件了。（作者大大不要打我）

如果希望进一步学习 postcss 的插件开发，建议参考[官方文档](http://api.postcss.org/)。另外， [rucksack](https://github.com/simplaio/rucksack) 这个项目整合了许多优秀的 postcss 插件，可以从看别人插件源码，有问题查文档的方法来进一步了解 postcss 插件。

## 阅读注释的理论基础

提前讲几个概念我自己的理解，欢迎各种拍砖纠正。不怕错误，就怕抱持着错误的理解一直无知下去。

首先这是一段 css：

```css
/* index.css */

body, div {
  width: 100px;
  clear: fix;
}

label {
  clear: fix;
}

```

在 postcss 的概念里，一个选择器与对应 css 规则的组合，叫 [AtRule](http://api.postcss.org/AtRule.html) （rule）；每一条 css 规则，叫 [Declaration](http://api.postcss.org/Declaration.html) （decl）。在上面的示例中，有两个 rule ，三个 decl 。

好了，就这两个概念。

## postcss 插件的引入

详见 [webpack.config.js](./webpack.config.js#L32) 。

## 项目中的输入输出文件

输入：/index.css

输出：/dist/app.css

## 项目中规定的命令

```sh
npm install # 安装 node 依赖
npm start   # 开始构建 /dist/app.css
```

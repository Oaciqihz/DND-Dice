# Introduction

【DND跑团骰子】
[参考网站](https://www.dnddiceroller.com/)
## 1.一套骰子共有6种（通常情况）

 - 20面骰子：1-20
 - 12面： 1-12
 - 10面：类推
 - 8面：类推
 - 6面：类推
 - 4面：类推

## 2.骰子的使用方式：

跑团时根据需要掷骰子，根据具体情况“设置”要投掷的【骰子数量】，【骰子面数】，和【灵活加减值】，再计算总和得出【总数值】

```
如：
d=dice
扔一个20面骰子，加一个4面骰子：

d20+d4   根据得出的【随机数】相加得到总数值

扔一个20面骰子，加一个12面骰子，因pc属性原因+2点-1点：

d20+d12+2-1   根据得出的【随机数】与【灵活数值】相加得到总数值

扔两个20面骰子，加四个12面骰子，因属性原因+5点+2点+4点-2点：

2d20+4d12+5+2+4-2   根据得出的【随机数】与【灵活数值】相加得到总数值
```

**由此可知：**

- *1.可以投掷的骰子数量不限*
- *2.可以±的灵活数值不限*

------

# Create React App

This directory is a brief example of a [Create React App](https://github.com/facebook/create-react-app) site that can be deployed to Vercel with zero configuration.

## Deploy Your Own

Deploy your own Create React App project with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/create-react-app&template=create-react-app)

_Live Example: https://create-react-template.vercel.app/_

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.
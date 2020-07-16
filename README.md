#  MW 一个ui框架

[![Build Status](https://travis-ci.org/o0Chivas0o/my-wheel.svg?branch=master)](https://travis-ci.org/o0Chivas0o/my-wheel)

![GitHub package.json version](https://img.shields.io/github/package-json/v/o0Chivas0o/my-wheel.svg)

## 介绍

## 开始使用

1. 安装
   使用本框架前,请在 CSS 中开启 border-box

   ```css
    *,*::before,*::after{box-sizing:border-box}
   ```
   IE 8 以上浏览器支持次样式 。

   你还需要设置默认颜色等变量(后续会改为 SCSS 变量)
   ```css
    html {
        --button-height: 32px;
        --font-size: 14px;
        --button-bg: white;
        --button-active-bg: #eee;
        --border-radius: 4px;
        --color: #999;
        --border-color: #999;
        --border-color-hover: #666;
       }
   ```
   IE 15 及以上浏览器都支持此样式 。
2. 安装 my-wheel
   ```
    $ npm i -S my-wheel-test
   ```
3. 引入 my-wheel
   ```javascript
     import {Button, ButtonGroup, Icon} from 'my-wheel-tests'
     import 'my-wheel-tests/dist/index.css'

     export default {
       name: 'app',
        components: {
         'w-button': Button,
         'w-icon': Icon
       }
   }
   ```
   
## 文档

## 提问

## 变更记录

## 联系方式

## 贡献代码


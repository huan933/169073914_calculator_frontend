# Calculator Frontend (Web)

前后端分离计算器系统的前端，使用 **原生 HTML + CSS + JavaScript**（无框架依赖）。

## 技术栈

- HTML5 / CSS3 / 原生 JavaScript (ES6+)
- 通过 `fetch` 调用后端 REST API

## 项目结构

```
169073914_calculator_frontend/
├── src/
│   ├── index.html    # 计算器页面
│   ├── style.css     # 样式
│   └── script.js    # 交互逻辑与 API 请求
├── README.md
└── codestyle.md
```

## 运行环境

- 任意现代浏览器（Chrome / Edge / Firefox）
- 推荐使用 VS Code 的 **Live Server** 插件启动

## 启动方式

### 方式一：Live Server（推荐）

1. 在 VS Code 中打开 `src` 文件夹
2. 右键 `index.html` → `Open with Live Server`
3. 浏览器会自动打开 http://127.0.0.1:5500

### 方式二：直接打开

直接双击 `index.html` 用浏览器打开即可。

## 与后端连接

前端代码中 `script.js` 顶部的 `API_BASE` 变量指向后端地址：

```js
const API_BASE = "http://localhost:8000";
```

- 本地开发时保持默认值即可。
- 部署时改为后端公网地址（例如 `https://your-backend.example.com`）。

## 功能说明

- 按钮输入数字、运算符（+ − × ÷）、括号、小数点
- 点击 `=` 向后端提交表达式，展示后端返回的结果
- 历史记录从后端数据库加载，支持单条删除与清空全部
- 前端不做任何计算，所有计算由后端完成

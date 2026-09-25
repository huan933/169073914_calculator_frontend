# JavaScript 代码规范（codestyle.md）

> 本规范依据 **Airbnb JavaScript Style Guide**（全球最广泛使用的 JS 风格指南之一）制定。
> 参考来源：https://github.com/airbnb/javascript

## 1. 缩进与格式

- 使用 **2 个空格** 缩进，禁止 Tab。
- 字符串统一使用单引号 `'...'`（本项目 HTML 内联除外）。
- 语句结尾加分号。
- 大括号同行开头，如 `if (x) { ... }`。

## 2. 变量声明

- 优先使用 `const`，需要重新赋值时才用 `let`。
- 禁止使用 `var`。

```js
const API_BASE = "http://localhost:8000";
let currentExpression = "0";
```

## 3. 命名规范

| 类型 | 风格 | 示例 |
| --- | --- | --- |
| 变量 / 函数 | 小驼峰 camelCase | `loadHistory`、`currentExpression` |
| 常量 | 全大写下划线 | `API_BASE` |
| DOM 元素 id | 小驼峰 | `historyList` |
| 类名 | 小驼峰或连字符 | `.history-item` |

## 4. 函数

- 使用函数声明或箭头函数，具名函数优先。
- 异步操作使用 `async/await`，避免嵌套回调。

```js
async function doCalculate() {
  const resp = await fetch(url);
  const data = await resp.json();
}
```

## 5. DOM 操作

- 通过 `getElementById` / `querySelector` 获取元素。
- 事件绑定使用 `addEventListener`，禁止内联 `onclick`。

## 6. 注释

- 顶部块注释说明模块职责。
- 复杂逻辑用单行注释说明"为什么"。

## 7. 其他

- 运算符两侧加空格。
- 对象/数组最后不加尾逗号（兼容旧浏览器场景除外）。
- 禁止在前端进行数学表达式计算——计算统一由后端完成。

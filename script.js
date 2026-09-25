/**
 * 前端脚本：负责按钮交互、向后端发送请求、展示结果和历史记录。
 *
 * 重要：前端不做任何表达式计算！
 * 所有计算都由后端完成，前端只负责收集表达式字符串并展示后端返回的结果。
 */

// 后端 API 地址（部署时改成公网后端地址）
const API_BASE = "http://localhost:8000";

const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");
const errorEl = document.getElementById("error");
const historyList = document.getElementById("historyList");

let currentExpression = "0";

// ---------- 显示控制 ----------
function updateDisplay() {
  expressionEl.textContent = currentExpression;
}

function showError(msg) {
  errorEl.textContent = msg;
  setTimeout(() => (errorEl.textContent = ""), 3000);
}

function resetDisplay() {
  currentExpression = "0";
  resultEl.textContent = "= ";
  updateDisplay();
}

// ---------- 按钮事件 ----------
document.querySelectorAll(".key").forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.dataset.value;
    const action = btn.dataset.action;

    if (val !== undefined) {
      // 输入数字/运算符/括号/小数点
      if (currentExpression === "0" && /[0-9.]/.test(val)) {
        currentExpression = val;
      } else {
        currentExpression += val;
      }
      resultEl.textContent = "= ";
      updateDisplay();
    } else if (action === "clear") {
      resetDisplay();
    } else if (action === "backspace") {
      currentExpression = currentExpression.slice(0, -1);
      if (currentExpression === "") currentExpression = "0";
      updateDisplay();
    } else if (action === "calculate") {
      doCalculate();
    }
  });
});

// ---------- 调用后端计算 ----------
async function doCalculate() {
  if (!currentExpression || currentExpression === "0") {
    showError("请输入表达式");
    return;
  }

  try {
    const resp = await fetch(`${API_BASE}/api/calculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expression: currentExpression }),
    });

    const data = await resp.json();

    if (resp.ok && data.success) {
      resultEl.textContent = "= " + data.result;
      loadHistory(); // 刷新历史
    } else {
      // FastAPI 错误返回 {detail: "..."}
      showError(data.detail || data.message || "计算失败");
    }
  } catch (e) {
    showError("无法连接后端服务，请确认后端已启动");
  }
}

// ---------- 历史记录 ----------
async function loadHistory() {
  try {
    const resp = await fetch(`${API_BASE}/api/history`);
    const records = await resp.json();

    if (!records || records.length === 0) {
      historyList.innerHTML = '<div class="empty">暂无历史记录</div>';
      return;
    }

    historyList.innerHTML = records
      .map((r) => {
        const time = new Date(r.created_at).toLocaleString("zh-CN");
        return `
        <div class="history-item" data-id="${r.id}">
          <div class="info">
            <div class="expr">${r.expression}</div>
            <div class="res">= ${r.result}</div>
            <div class="time">${time}</div>
          </div>
          <button class="del" data-id="${r.id}" title="删除">✕</button>
        </div>`;
      })
      .join("");

    // 绑定删除事件
    historyList.querySelectorAll(".del").forEach((btn) => {
      btn.addEventListener("click", () => deleteHistory(btn.dataset.id));
    });
  } catch (e) {
    historyList.innerHTML = '<div class="empty">历史加载失败</div>';
  }
}

async function deleteHistory(id) {
  try {
    const resp = await fetch(`${API_BASE}/api/history/${id}`, { method: "DELETE" });
    if (resp.ok) loadHistory();
  } catch (e) {
    showError("删除失败");
  }
}

// 清空全部
document.getElementById("clearAllBtn").addEventListener("click", async () => {
  if (!confirm("确定要清空全部历史记录吗？")) return;
  try {
    await fetch(`${API_BASE}/api/history`, { method: "DELETE" });
    loadHistory();
  } catch (e) {
    showError("清空失败");
  }
});

// 页面加载时拉取历史
loadHistory();

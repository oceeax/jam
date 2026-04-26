// 全局配置
const txtUrl = "/count.txt";
const visitFlag = "only_one_visit_2026";
const numKey = "user_only_id";

// 4位补零 0001 0002
function formatNum(n) {
  return String(n).padStart(4, '0');
}

// 挂载显示盒子
function showId(text) {
  const div = document.createElement("div");
  div.style.position = "fixed";
  div.style.right = "15px";
  div.style.bottom = "15px";
  div.style.background = "#000";
  div.style.color = "#fff";
  div.style.padding = "6px 12px";
  div.style.borderRadius = "6px";
  div.style.fontSize = "14px";
  div.style.zIndex = "9999";
  div.innerText = "访客编号：" + text;
  document.body.appendChild(div);
}

async function initCount() {
  // 读取基础数字
  const res = await fetch(txtUrl, { cache: "no-store" });
  let base = parseInt(await res.text()) || 0;

  // 老用户：直接读取自己编号，只展示，不再+1
  if (localStorage.getItem(visitFlag)) {
    let oldNum = localStorage.getItem(numKey);
    showId(formatNum(oldNum));
    return;
  }

  // 全新用户 → 编号+1，并且锁死
  let newId = base + 1;
  // 保存标记 + 专属编号
  localStorage.setItem(visitFlag, "ok");
  localStorage.setItem(numKey, newId);

  // 显示 0001 格式
  showId(formatNum(newId));
}

initCount();

// 全站统一访客统计，一人只算1次
const txtUrl = "/count.txt";
const visitFlag = "site_visited_2026";
const countKey = "site_user_num";

async function siteCount() {
    // 读取固定基础值
    let res = await fetch(txtUrl, { cache: "no-store" });
    let base = parseInt(await res.text().trim()) || 0;

    // 已经标记过该用户，直接退出，不再重复计数
    if (localStorage.getItem(visitFlag)) return;

    // 新用户 + 标记
    let num = localStorage.getItem(countKey);
    if (!num) {
        num = base + 1;
    } else {
        num = parseInt(num) + 1;
    }

    localStorage.setItem(countKey, num);
    localStorage.setItem(visitFlag, "1");
}

// 直接运行
siteCount();

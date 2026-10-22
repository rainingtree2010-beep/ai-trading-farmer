// 台北時間時鐘 + 尾盤進場窗口（13:00–13:30）標示；頁尾年份。
(function () {
  var clockEl = document.getElementById("taipeiClock");
  var badgeEl = document.getElementById("windowBadge");
  var yearEl = document.getElementById("year");

  function tick() {
    var now = new Date();
    if (yearEl) {
      yearEl.textContent = new Intl.DateTimeFormat("zh-TW", {
        timeZone: "Asia/Taipei",
        year: "numeric"
      }).format(now);
    }
    if (!clockEl) return;
    var parts = new Intl.DateTimeFormat("zh-TW", {
      timeZone: "Asia/Taipei",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).formatToParts(now);
    var h = 0, m = 0, s = "00";
    parts.forEach(function (p) {
      if (p.type === "hour") h = parseInt(p.value, 10) % 24;
      if (p.type === "minute") m = parseInt(p.value, 10);
      if (p.type === "second") s = p.value;
    });
    var pad = function (n) { return String(n).padStart(2, "0"); };
    clockEl.textContent = pad(h) + ":" + pad(m) + ":" + s;
    if (badgeEl) {
      var mins = h * 60 + m;
      var inWindow = mins >= 13 * 60 && mins < 13 * 60 + 30;
      badgeEl.classList.toggle("in-window", inWindow);
      badgeEl.title = inWindow ? "現在落在 13:00–13:30 尾盤進場窗口" : "現在不在 13:00–13:30 尾盤進場窗口";
    }
  }

  tick();
  setInterval(tick, 1000);
})();

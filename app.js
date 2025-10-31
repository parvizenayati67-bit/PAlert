// === PAlert by Parviz 😎 ===

// لیست ارزها
const coins = ["BTC", "ETH", "SOL", "DOT", "ADA", "AVAX", "XRP", "PEPE", "DOGE", "ATOM", "GALA", "ARB", "DYDX"];
const stopLoss = 0.28;
const takeProfit = 0.48;

// 🔔 کنترل صدا
let soundEnabled = true;

function toggleSound() {
  soundEnabled = !soundEnabled;
  document.getElementById("sound-btn").textContent = soundEnabled ? "🔔 Sound: ON" : "🔕 Sound: OFF";
}

// 🎵 پخش آلارم در صورت فعال بودن
function playAlertSound() {
  if (soundEnabled) {
    const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
    audio.play();
  }
}

// 🎯 تولید سیگنال تصادفی برای تست
function randomSignal() {
  return Math.random() > 0.5 ? "BUY" : "SELL";
}

function randomLeverage() {
  return Math.floor(Math.random() * 50) + 1; // 1 تا 50
}

function randomEntryPrice() {
  return (Math.random() * 1000 + 100).toFixed(2); // بین 100 تا 1100
}

// 📊 ساخت کارت‌ها
function generateSignals() {
  const container = document.getElementById("coins");
  container.innerHTML = "";

  coins.forEach((coin) => {
    const signal = randomSignal();
    const leverage = randomLeverage();
    const entry = randomEntryPrice();

    const card = document.createElement("div");
    card.className = "coin-card";
    card.innerHTML = `
      <h2>${coin}</h2>
      <p>Signal: <strong style="color:${signal === "BUY" ? "#00ffb3" : "#ff6b6b"}">${signal}</strong></p>
      <p>Entry: ${entry}</p>
      <p>Leverage: ${leverage}x</p>
      <p>Stop Loss: -${(stopLoss * 100).toFixed(0)}%</p>
      <p>Take Profit: +${(takeProfit * 100).toFixed(0)}%</p>
    `;

    container.appendChild(card);
  });

  playAlertSound();
}

// 🚀 اجرای اولیه فقط یک‌بار
window.onload = function () {
  generateSignals();
};

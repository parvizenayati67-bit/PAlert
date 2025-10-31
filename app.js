// 🚀 PAlert – Advanced Signal Dashboard
// By Parviz 😎

// تنظیم ارزها (قابل فعال/غیرفعال شدن در آینده)
const coins = [
  "BTC", "ETH", "SOL", "DOT", "ADA",
  "AVAX", "XRP", "PEPE", "DOGE", "ATOM",
  "GALA", "ARB", "DYDX"
];

const RR = 1.7;
const stopLoss = 0.28;
const takeProfit = 0.48;

// تولید سیگنال تستی (در نسخه واقعی با وب‌هوک از اندیکاتور پر میشه)
function randomSignal() {
  return Math.random() > 0.5 ? "BUY" : "SELL";
}

function randomEntryPrice() {
  return (Math.random() * 60000 + 1000).toFixed(2);
}

function calcLeverage(entry, slPercent) {
  // طوری که استاپ تقریبا ۲۸٪ فاصله داشته باشه
  return Math.min(100, Math.max(1, Math.floor((slPercent * 100) / 0.28)));
}

function generateSignals() {
  const container = document.getElementById("coins");
  container.innerHTML = "";

  coins.forEach((coin) => {
    const signal = randomSignal();
    const entry = randomEntryPrice();
    const leverage = calcLeverage(entry, stopLoss);

    const card = document.createElement("div");
    card.className = "coin-card";

    card.innerHTML = `
      <h2>${coin}</h2>
      <p class="signal ${signal === "BUY" ? "buy" : "sell"}">${signal}</p>
      <p>🎯 Entry: ${entry}</p>
      <p>⛔ Stop Loss: -${(stopLoss * 100).toFixed(0)}%</p>
      <p>💰 Take Profit: +${(takeProfit * 100).toFixed(0)}%</p>
      <p>⚙️ Leverage: ${leverage}x</p>
    `;

    container.appendChild(card);
  });

  playAlarm();
}

function playAlarm() {
  // چند صدای مختلف برای انتخاب در نسخه نهایی
  const sounds = [
    "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
    "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg",
    "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
  ];

  const audio = new Audio(sounds[Math.floor(Math.random() * sounds.length)]);
  audio.loop = true;
  audio.play();

  // تا وقتی دیسمیس نشه ادامه داره
  setTimeout(() => audio.pause(), 12000); // ۱۲ ثانیه برای تست
}

// هر ۱۵ ثانیه یکبار به‌روزرسانی
setInterval(generateSignals, 15000);
window.onload = generateSignals;

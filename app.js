// ==========================
// PAlert – Phase 1 (Stable)
// ==========================

// 🔔 تنظیمات آلارم
let soundEnabled = true;
let alarmInterval = null;
let snoozeTimeout = null;

// 🪙 لیست ارزها (آپدیت‌شده)
const coins = [
  "BTC","ETH","SOL","ADA","DOT","AVAX",
  "XRP","DOGE","ATOM",
  "GALA","ARB",
  "UNI","DYDX",
  "ICP","NEO"
];

// 📊 تنظیمات استراتژی
const STOP_PERCENT = 28;
const TP_PERCENT = 48;
const RR = 1.7;

// ==========================
// 🔊 آلارم حرفه‌ای
// ==========================
function startAlarm() {
  if (!soundEnabled) return;

  stopAlarm();

  // 🔔 هر ۱.۵ ثانیه بوق – به مدت ۳۰ ثانیه
  let count = 0;
  alarmInterval = setInterval(() => {
    playBeep();
    count++;
    if (count >= 20) { // حدود ۳۰ ثانیه
      stopAlarm();
      startSnooze();
    }
  }, 1500);
}

function startSnooze() {
  if (!soundEnabled) return;
  snoozeTimeout = setTimeout(() => {
    startAlarm();
  }, 5 * 60 * 1000); // ۵ دقیقه
}

function stopAlarm() {
  clearInterval(alarmInterval);
  clearTimeout(snoozeTimeout);
}

function playBeep() {
  const audio = new Audio(
    "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
  );
  audio.play();
}

// ==========================
// 🎛️ دکمه ON / OFF
// ==========================
document.getElementById("soundBtn").onclick = () => {
  soundEnabled = !soundEnabled;
  document.getElementById("soundBtn").innerText =
    soundEnabled ? "🔔 Sound: ON" : "🔕 Sound: OFF";

  if (!soundEnabled) stopAlarm();
};

// ==========================
// 📦 ساخت کارت‌ها (فعلاً نمایشی)
// ==========================
function generateCards() {
  const container = document.getElementById("coins");
  container.innerHTML = "";

  coins.forEach((coin) => {
    const direction = Math.random() > 0.5 ? "LONG" : "SHORT";
    const entry = (Math.random() * 100 + 10).toFixed(2);
    const leverage = Math.floor(Math.random() * 20) + 1;

    const card = document.createElement("div");
    card.className = "coin-card";

    card.innerHTML = `
      <h3>${coin}</h3>
      <p class="${direction === "LONG" ? "long" : "short"}">
        ${direction}
      </p>
      <p>Entry: ${entry}</p>
      <p>Leverage: ${leverage}x</p>
      <p>Stop: -${STOP_PERCENT}%</p>
      <p>Target: +${TP_PERCENT}%</p>
    `;

    container.appendChild(card);
  });
}

// ==========================
// 🚀 اجرا
// ==========================
window.onload = () => {
  generateCards();
};

// =================== CONFIG ===================
const MAX_SAME_DIRECTION = 6;
const STOP_LOSS = 0.28;
const TAKE_PROFIT = 0.48;

// =================== STATE ===================
let alarmEnabled = true;
let activeSignals = []; // { coin, side }
let snooze = false;

const coins = [
  "BTC","ETH","SOL","DOT","ADA","AVAX","XRP","PEPE","DOGE","ATOM",
  "GALA","ARB","DYDX","ICP","NEO","UNI"
];

let coinEnabled = {};
coins.forEach(c => coinEnabled[c] = true);

// =================== UI ===================
const coinsDiv = document.getElementById("coins");
const selectorDiv = document.getElementById("coinSelector");
const alarmBtn = document.getElementById("alarmBtn");

// ---------- Coin selector ----------
function buildCoinSelector() {
  selectorDiv.innerHTML = "";
  coins.forEach(coin => {
    const div = document.createElement("div");
    div.className = "coin-toggle";
    div.innerText = coin;

    div.onclick = () => {
      coinEnabled[coin] = !coinEnabled[coin];
      div.classList.toggle("off", !coinEnabled[coin]);
    };

    selectorDiv.appendChild(div);
  });
}

// ---------- Alarm toggle ----------
alarmBtn.onclick = () => {
  alarmEnabled = !alarmEnabled;
  alarmBtn.innerText = alarmEnabled ? "🔔 Alarm: ON" : "🔕 Alarm: OFF";
};

// =================== SIGNAL LOGIC ===================

// ⛔ فعلاً فقط تست دستی / بعداً webhook
function receiveSignal({ coin, side, entry, leverage }) {
  if (!coinEnabled[coin]) return;

  const sameSideCount = activeSignals.filter(s => s.side === side).length;
  if (sameSideCount >= MAX_SAME_DIRECTION) return;

  const exists = activeSignals.find(s => s.coin === coin);
  if (exists) return;

  activeSignals.push({ coin, side });
  renderCard({ coin, side, entry, leverage });

  if (alarmEnabled) triggerAlarm();
}

// =================== RENDER ===================
function renderCard({ coin, side, entry, leverage }) {
  const card = document.createElement("div");
  card.className = "coin-card";

  card.innerHTML = `
    <h3>${coin}</h3>
    <p class="${side === "LONG" ? "long" : "short"}"><b>${side}</b></p>
    <p>Entry: ${entry}</p>
    <p>Leverage: ${leverage}x</p>
    <p>SL: -${STOP_LOSS * 100}%</p>
    <p>TP: +${TAKE_PROFIT * 100}%</p>
  `;

  coinsDiv.prepend(card);
}

// =================== ALARM ===================
function triggerAlarm() {
  if (snooze) return;

  const audio = new Audio(
    "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
  );

  audio.loop = true;
  audio.play();

  // ⏱️ 30 ثانیه صدا
  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
    snooze = true;

    // 😴 5 دقیقه اسنوز
    setTimeout(() => {
      snooze = false;
    }, 5 * 60 * 1000);

  }, 30000);
}

// =================== INIT ===================
window.onload = () => {
  buildCoinSelector();

  // 🔧 تست دستی (بعداً حذف می‌کنی)
  /*
  receiveSignal({
    coin: "BTC",
    side: "LONG",
    entry: "43250",
    leverage: 10
  });
  */
};

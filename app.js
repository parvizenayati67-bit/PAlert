// ===============================
// PAlert – Final Logic
// ===============================

const coins = [
  "BTC", "ETH", "SOL", "DOT", "ADA",
  "AVAX", "XRP", "PEPE", "DOGE",
  "ATOM", "GALA", "ARB", "DYDX",
  "ICP", "NEO"
];

const MAX_SAME_DIRECTION = 6;
const STOP_LOSS = 0.28;   // 28%
const TAKE_PROFIT = 0.48; // 48%

let alarmEnabled = false;
let activeLongs = 0;
let activeShorts = 0;

// -------------------------------
// UI
// -------------------------------
const alarmBtn = document.getElementById("alarmBtn");
alarmBtn.onclick = () => {
  alarmEnabled = !alarmEnabled;
  alarmBtn.textContent = alarmEnabled ? "Alarm ON" : "Alarm OFF";
  alarmBtn.className = alarmEnabled ? "on" : "off";
};

function updateCounters() {
  document.getElementById("longCount").textContent = activeLongs;
  document.getElementById("shortCount").textContent = activeShorts;
}

// -------------------------------
// Helpers (temporary mock)
// -------------------------------
function getSignalFromIndicator() {
  return Math.random() > 0.5 ? "BUY" : "SELL";
}

function getEntryPrice() {
  return (Math.random() * 50000 + 100).toFixed(2);
}

function calculateLeverage() {
  return Math.floor((TAKE_PROFIT / STOP_LOSS) * 10);
}

function playAlarm() {
  if (!alarmEnabled) return;
  const audio = new Audio(
    "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
  );
  audio.play();
}

// -------------------------------
// Main
// -------------------------------
function generateSignals() {
  const container = document.getElementById("coins");
  container.innerHTML = "";

  activeLongs = 0;
  activeShorts = 0;

  coins.forEach((coin) => {
    const signal = getSignalFromIndicator();

    // Direction filter
    if (signal === "BUY" && activeLongs >= MAX_SAME_DIRECTION) return;
    if (signal === "SELL" && activeShorts >= MAX_SAME_DIRECTION) return;

    const entry = getEntryPrice();
    const leverage = calculateLeverage();

    if (signal === "BUY") activeLongs++;
    if (signal === "SELL") activeShorts++;

    const card = document.createElement("div");
    card.className = "coin-card";

    card.innerHTML = `
      <h3>${coin}</h3>
      <p>Signal:
        <strong class="${signal === "BUY" ? "buy" : "sell"}">
          ${signal}
        </strong>
      </p>
      <p>Entry: ${entry}</p>
      <p>Leverage: ${leverage}x</p>
      <p>Stop Loss: -28%</p>
      <p>Take Profit: +48%</p>
    `;

    container.appendChild(card);
  });

  updateCounters();
  playAlarm();
}

// اجرای دستی فقط وقتی خودت خواستی
generateSignals();

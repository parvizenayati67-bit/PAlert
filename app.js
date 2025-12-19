// ==========================
// PAlert – Core Logic
// ==========================

// ===== SETTINGS =====
let alertEnabled = true;

const RR = 1.7;
const STOP_PERCENT = 0.28;
const TAKE_PERCENT = 0.48;

const coins = [
  "BTC", "ETH", "SOL", "DOT", "ADA",
  "AVAX", "XRP", "PEPE", "DOGE", "ATOM",
  "NEO", "ICP"
];

// برای جلوگیری از آلارم تکراری
let lastSignals = {};

// ===== HELPERS =====
function randomSignal() {
  return Math.random() > 0.5 ? "BUY" : "SELL";
}

function randomPrice() {
  return (Math.random() * 50000 + 100).toFixed(2);
}

function calculateLeverage(entry, stop) {
  const riskPercent = Math.abs((entry - stop) / entry);
  return Math.min(100, Math.max(1, Math.round(STOP_PERCENT / riskPercent)));
}

// ===== ALERT SOUND =====
function playAlertSound() {
  if (!alertEnabled) return;

  const audio = new Audio(
    "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
  );
  audio.loop = true;
  audio.play();

  // برای اینکه گوشی دیوونه نشه
  setTimeout(() => audio.pause(), 6000);
}

// ===== MAIN LOGIC =====
function generateSignals() {
  const container = document.getElementById("coins");
  container.innerHTML = "";

  coins.forEach((coin) => {
    const signal = randomSignal();

    // جلوگیری از سیگنال تکراری
    if (lastSignals[coin] === signal) return;
    lastSignals[coin] = signal;

    const entry = parseFloat(randomPrice());
    const stop =
      signal === "BUY"
        ? entry * (1 - STOP_PERCENT)
        : entry * (1 + STOP_PERCENT);

    const tp =
      signal === "BUY"
        ? entry * (1 + TAKE_PERCENT)
        : entry * (1 - TAKE_PERCENT);

    const leverage = calculateLeverage(entry, stop);

    const card = document.createElement("div");
    card.className = "coin-card";

    card.innerHTML = `
      <h3>${coin}</h3>
      <p>Signal: <strong class="${signal === "BUY" ? "buy" : "sell"}">${signal}</strong></p>
      <p>Entry: ${entry.toFixed(2)}</p>
      <p>Stop Loss: ${stop.toFixed(2)}</p>
      <p>Take Profit: ${tp.toFixed(2)}</p>
      <p>Leverage: ${leverage}x</p>
    `;

    container.appendChild(card);
    playAlertSound();
  });
}

// ===== BUTTONS =====
document.getElementById("soundToggle").addEventListener("click", () => {
  alertEnabled = !alertEnabled;
  document.getElementById("soundToggle").innerText =
    alertEnabled ? "🔔 Sound: ON" : "🔕 Sound: OFF";
});

// ===== INITIAL RUN =====
window.onload = generateSignals;

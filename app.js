// ==========================
// PAlert – Stable Version
// ==========================

let alertEnabled = true;

const STOP_PERCENT = 0.28;
const TAKE_PERCENT = 0.48;

const coins = [
  "BTC", "ETH", "SOL", "DOT", "ADA",
  "AVAX", "XRP", "PEPE", "DOGE", "ATOM",
  "NEO", "ICP"
];

// ==========================
// Helpers
// ==========================
function randomSignal() {
  return Math.random() > 0.5 ? "BUY" : "SELL";
}

function randomPrice() {
  return (Math.random() * 50000 + 500).toFixed(2);
}

function calculateLeverage(entry, stop) {
  const risk = Math.abs((entry - stop) / entry);
  return Math.min(100, Math.max(1, Math.round(STOP_PERCENT / risk)));
}

// ==========================
// Sound
// ==========================
function playAlertSound() {
  if (!alertEnabled) return;

  const audio = new Audio(
    "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
  );
  audio.play();
}

// ==========================
// Main
// ==========================
function generateSignals() {
  const container = document.getElementById("coins");
  if (!container) return;

  container.innerHTML = "";

  coins.forEach((coin) => {
    const signal = randomSignal();
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
  });

  playAlertSound();
}

// ==========================
// Toggle Button
// ==========================
document.getElementById("soundToggle").addEventListener("click", () => {
  alertEnabled = !alertEnabled;
  document.getElementById("soundToggle").innerText =
    alertEnabled ? "🔔 Sound: ON" : "🔕 Sound: OFF";
});

// ==========================
// Init (با تأخیر امن)
// ==========================
setTimeout(generateSignals, 300);

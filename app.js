let alertEnabled = true;

const STOP_PERCENT = 0.28;
const TAKE_PERCENT = 0.48;

const coins = [
  "BTC", "ETH", "SOL", "DOT", "ADA",
  "AVAX", "XRP", "PEPE", "DOGE", "ATOM",
  "NEO", "ICP"
];

function randomSignal() {
  return Math.random() > 0.5 ? "BUY" : "SELL";
}

function randomEntry() {
  return (Math.random() * 40000 + 1000);
}

function calcLeverage(entry, stop) {
  const risk = Math.abs((entry - stop) / entry);
  return Math.min(100, Math.max(1, Math.round(STOP_PERCENT / risk)));
}

function playAlertSound() {
  if (!alertEnabled) return;
  const audio = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
  audio.play();
}

function generateSignals() {
  const container = document.getElementById("coins");
  container.innerHTML = "";

  coins.forEach((coin) => {
    const signal = randomSignal();
    const entry = randomEntry();

    const stop = signal === "BUY"
      ? entry * (1 - STOP_PERCENT)
      : entry * (1 + STOP_PERCENT);

    const tp = signal === "BUY"
      ? entry * (1 + TAKE_PERCENT)
      : entry * (1 - TAKE_PERCENT);

    const leverage = calcLeverage(entry, stop);

    const card = document.createElement("div");
    card.className = "coin-card";

    card.innerHTML = `
      <h3>${coin}</h3>
      <p>Signal: <strong class="${signal === "BUY" ? "buy" : "sell"}">${signal}</strong></p>
      <p>Entry: ${entry.toFixed(2)}</p>
      <p>Stop: ${stop.toFixed(2)}</p>
      <p>Target: ${tp.toFixed(2)}</p>
      <p>Leverage: ${leverage}x</p>
    `;

    container.appendChild(card);
  });

  playAlertSound();
}

document.getElementById("soundToggle").onclick = () => {
  alertEnabled = !alertEnabled;
  document.getElementById("soundToggle").innerText =
    alertEnabled ? "🔔 Sound: ON" : "🔕 Sound: OFF";
};

window.onload = () => {
  generateSignals();
};

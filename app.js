// PAlert by Parviz 😎
// Simple version – fetches signals and displays alerts

const coins = ["BTC", "ETH", "SOL", "DOT", "ADA", "AVAX", "XRP", "PEPE", "DOGE", "ATOM"];
const RR = 1.7;
const stopLoss = 0.28; // 28%
const takeProfit = 0.48; // 48%

function randomSignal() {
  return Math.random() > 0.5 ? "BUY" : "SELL";
}

function randomLeverage() {
  return Math.floor(Math.random() * 100) + 1; // between 1–100
}

function randomEntryPrice() {
  return (Math.random() * 100000).toFixed(2);
}

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
      <p class="signal">Signal: <strong style="color:${signal === "BUY" ? "#00ffb3" : "#ff6b6b"}">${signal}</strong></p>
      <p>Entry: ${entry}</p>
      <p>Leverage: ${leverage}x</p>
      <p>Stop Loss: -${(stopLoss * 100).toFixed(0)}%</p>
      <p>Take Profit: +${(takeProfit * 100).toFixed(0)}%</p>
    `;

    container.appendChild(card);
  });

  // sound alert for each refresh
  const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
  audio.play();
}

// refresh signals every 15 seconds
setInterval(generateSignals, 15000);
window.onload = generateSignals;
// Manual refresh via button
document.getElementById("testButton").addEventListener("click", generateSignals);

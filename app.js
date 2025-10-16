// PAlert by Parviz 😎
// Now fetches real crypto prices from CoinGecko

const coins = [
  { id: "bitcoin", symbol: "BTC" },
  { id: "ethereum", symbol: "ETH" },
  { id: "solana", symbol: "SOL" },
  { id: "polkadot", symbol: "DOT" },
  { id: "cardano", symbol: "ADA" },
  { id: "avalanche-2", symbol: "AVAX" },
  { id: "ripple", symbol: "XRP" },
  { id: "pepe", symbol: "PEPE" },
  { id: "dogecoin", symbol: "DOGE" },
  { id: "cosmos", symbol: "ATOM" },
];

const stopLoss = 0.28;
const takeProfit = 0.48;

function randomSignal() {
  return Math.random() > 0.5 ? "BUY" : "SELL";
}

function randomLeverage() {
  return Math.floor(Math.random() * 20) + 1; // 1–20x realistic
}

async function generateSignals() {
  const container = document.getElementById("coins");
  container.innerHTML = "Loading...";

  try {
    // get real prices
    const ids = coins.map(c => c.id).join(",");
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
    const prices = await res.json();

    container.innerHTML = "";

    coins.forEach((coin) => {
      const signal = randomSignal();
      const leverage = randomLeverage();
      const entry = prices[coin.id]?.usd?.toLocaleString() || "N/A";

      const card = document.createElement("div");
      card.className = "coin-card";

      card.innerHTML = `
        <h2>${coin.symbol}</h2>
        <p class="signal">Signal: <strong style="color:${signal === "BUY" ? "#00ffb3" : "#ff6b6b"}">${signal}</strong></p>
        <p>Entry: $${entry}</p>
        <p>Leverage: ${leverage}x</p>
        <p>Stop Loss: -${(stopLoss * 100).toFixed(0)}%</p>
        <p>Take Profit: +${(takeProfit * 100).toFixed(0)}%</p>
      `;

      container.appendChild(card);
    });

    const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
    audio.play();
  } catch (err) {
    container.innerHTML = "⚠️ Error fetching prices.";
    console.error(err);
  }
}

setInterval(generateSignals, 15000);
window.onload = generateSignals;

// Manual refresh button
document.getElementById("testButton").addEventListener("click", generateSignals);


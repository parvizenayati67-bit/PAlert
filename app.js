// 🚀 PAlert by Parviz – Smart Signal Alert System 😎

const allCoins = ["BTC", "ETH", "SOL", "DOT", "ADA", "AVAX", "XRP", "PEPE", "DOGE", "ATOM", "GALA", "ARB", "DYDX"];
const RR = 1.7;
const stopLoss = 0.28; // 28%
const takeProfit = 0.48; // 48%

// 🔊 پیش‌فرض صدا
let selectedSound = "beep";
let activeCoins = JSON.parse(localStorage.getItem("activeCoins")) || [...allCoins];

// 🎵 صداهای مختلف
const sounds = {
  beep: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
  soft: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
  alert: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
};

// 🎛️ ساخت تنظیمات ارزها
function buildCoinSelector() {
  const coinSelector = document.getElementById("coinSelector");
  coinSelector.innerHTML = "";

  allCoins.forEach((coin) => {
    const label = document.createElement("label");
    label.style.display = "block";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = coin;
    checkbox.checked = activeCoins.includes(coin);
    checkbox.onchange = () => {
      if (checkbox.checked) {
        activeCoins.push(coin);
      } else {
        activeCoins = activeCoins.filter((c) => c !== coin);
      }
      localStorage.setItem("activeCoins", JSON.stringify(activeCoins));
    };
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" " + coin));
    coinSelector.appendChild(label);
  });
}

// 🎚️ انتخاب صدای آلارم
document.getElementById("soundSelect").addEventListener("change", (e) => {
  selectedSound = e.target.value;
});

// 🧮 سیگنال تصادفی (در نسخه واقعی از اندیکاتور تغذیه میشه)
function randomSignal() {
  return Math.random() > 0.5 ? "BUY" : "SELL";
}

function randomLeverage() {
  return Math.floor(Math.random() * 100) + 1;
}

function randomEntryPrice() {
  return (Math.random() * 90000 + 10000).toFixed(2);
}

// 🚨 تولید سیگنال‌ها
function generateSignals() {
  const container = document.getElementById("coins");
  container.innerHTML = "";

  activeCoins.forEach((coin) => {
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

  // 🔔 پخش آلارم
  const audio = new Audio(sounds[selectedSound]);
  audio.loop = true;
  audio.play();
}
// === Sound toggle ===
let soundEnabled = true;

const soundButton = document.createElement("button");
soundButton.textContent = "🔔 Sound: ON";
soundButton.style.background = "#00ffb3";
soundButton.style.color = "#0d1117";
soundButton.style.border = "none";
soundButton.style.padding = "8px 16px";
soundButton.style.borderRadius = "8px";
soundButton.style.cursor = "pointer";
soundButton.style.marginBottom = "10px";
soundButton.onclick = () => {
  soundEnabled = !soundEnabled;
  soundButton.textContent = soundEnabled ? "🔔 Sound: ON" : "🔕 Sound: OFF";
  soundButton.style.background = soundEnabled ? "#00ffb3" : "#555";
};
document.body.insertBefore(soundButton, document.getElementById("coins"));

// === Refresh signals ===
function playAlert() {
  if (soundEnabled) {
    const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
    audio.play();
  }
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

  playAlert();
}

setInterval(generateSignals, 15000);
window.onload = generateSignals;

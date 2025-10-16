// PAlert v2 by Parviz 😎
// Interactive version with settings and live signal simulation

const defaultCoins = ["BTC", "ETH", "SOL", "DOT", "ADA", "AVAX", "XRP", "PEPE", "DOGE", "ATOM"];
let activeCoins = [...defaultCoins];
let intervalTime = 15000;
let soundOn = true;
let theme = "dark";
let interval;

const RR = 1.7;
const stopLoss = 0.28;
const takeProfit = 0.48;

// -------- UI Elements --------
const coinsDiv = document.getElementById("coins");
const overlay = document.getElementById("overlay");
const settingsModal = document.getElementById("settings");
const intervalSelect = document.getElementById("interval");
const soundToggle = document.getElementById("soundToggle");
const themeSelect = document.getElementById("theme");
const coinList = document.getElementById("coinList");

// -------- Helpers --------
function randomSignal() {
  return Math.random() > 0.5 ? "BUY" : "SELL";
}

function randomLeverage() {
  return Math.floor(Math.random() * 100) + 1;
}

function randomEntryPrice(coin) {
  // simple mock data close to realistic market ranges
  const base = {
    BTC: 67000, ETH: 2500, SOL: 150, DOT: 6, ADA: 0.4, AVAX: 25, XRP: 0.5,
    PEPE: 0.000001, DOGE: 0.12, ATOM: 8
  };
  const range = base[coin] * 0.03;
  return (base[coin] + (Math.random() * range - range / 2)).toFixed(5);
}

// -------- Signal Generator --------
function generateSignals() {
  coinsDiv.innerHTML = "";
  activeCoins.forEach((coin) => {
    const signal = randomSignal();
    const leverage = randomLeverage();
    const entry = randomEntryPrice(coin);

    const card = document.createElement("div");
    card.className = "coin-card";
    card.innerHTML = `
      <h2>${coin}</h2>
      <p>Signal: <strong style="color:${signal === "BUY" ? "#00ffb3" : "#ff6b6b"}">${signal}</strong></p>
      <p>Entry: ${entry}</p>
      <p>Leverage: ${leverage}x</p>
      <p>Stop Loss: -${(stopLoss * 100).toFixed(0)}%</p>
      <p>Take Profit: +${(takeProfit * 100).toFixed(0)}%</p>
    `;
    coinsDiv.appendChild(card);
  });

  if (soundOn) {
    const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
    audio.play();
  }
}

// -------- Settings Modal --------
document.getElementById("settingsBtn").onclick = () => {
  overlay.style.display = "block";
  settingsModal.style.display = "block";
  updateSettingsUI();
};
overlay.onclick = closeSettings;

function updateSettingsUI() {
  intervalSelect.value = intervalTime;
  soundToggle.checked = soundOn;
  themeSelect.value = theme;

  coinList.innerHTML = "";
  defaultCoins.forEach((coin) => {
    const div = document.createElement("div");
    div.innerHTML = `<label><input type="checkbox" value="${coin}" ${activeCoins.includes(coin) ? "checked" : ""}> ${coin}</label>`;
    coinList.appendChild(div);
  });
}

function closeSettings() {
  overlay.style.display = "none";
  settingsModal.style.display = "none";
}

document.getElementById("save").onclick = () => {
  intervalTime = parseInt(intervalSelect.value);
  soundOn = soundToggle.checked;
  theme = themeSelect.value;

  activeCoins = Array.from(document.querySelectorAll("#coinList input:checked")).map(i => i.value);

  document.body.className = theme === "light" ? "light" : "";

  localStorage.setItem("palert-settings", JSON.stringify({ intervalTime, soundOn, theme, activeCoins }));

  clearInterval(interval);
  interval = setInterval(generateSignals, intervalTime);
  generateSignals();
  closeSettings();
};

// -------- Restore settings on load --------
window.onload = () => {
  const saved = localStorage.getItem("palert-settings");
  if (saved) {
    const s = JSON.parse(saved);
    intervalTime = s.intervalTime || intervalTime;
    soundOn = s.soundOn ?? soundOn;
    theme = s.theme || theme;
    activeCoins = s.activeCoins || activeCoins;
    document.body.className = theme === "light" ? "light" : "";
  }
  generateSignals();
  interval = setInterval(generateSignals, intervalTime);
};

document.getElementById("refresh").onclick = generateSignals;

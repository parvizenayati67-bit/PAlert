// PAlert - Core Signal Listener
// Created by ChatGPT (custom build for Parviz)

const alertList = document.getElementById("alertList");
const testButton = document.getElementById("testButton");
const sound = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");

let activeSymbols = new Set();

function addAlert(symbol, side, entry, sl, tp, leverage) {
  if (activeSymbols.has(symbol)) return; // skip if already active

  activeSymbols.add(symbol);
  const time = new Date().toLocaleTimeString();
  const div = document.createElement("div");
  div.className = "alert";
  div.innerHTML = `
    <strong>${symbol}</strong> → ${side.toUpperCase()}<br>
    Entry: ${entry}<br>
    SL: ${sl} | TP: ${tp}<br>
    Leverage: ${leverage}x<br>
    <small>${time}</small>
  `;
  alertList.prepend(div);
  sound.play();
  navigator.vibrate([200, 100, 200]);
  setTimeout(() => activeSymbols.delete(symbol), 300000); // 5 min later allow new
}

testButton.addEventListener("click", () => {
  addAlert("BTCUSDT", "BUY", "67450", "66900", "68400", "15");
});

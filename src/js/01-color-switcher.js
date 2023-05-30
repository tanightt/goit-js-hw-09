const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');

start.addEventListener('click', onStartCreateColor);
stop.addEventListener('click', onStopCreateColor);
let intervalId = null;

function onStartCreateColor() {
    start.disabled = true;
    stop.disabled = false;
    intervalId = setInterval(() => {
        document.body.style.background = getRandomHexColor();
    }, 1000);
}

function onStopCreateColor() {
    start.disabled = false;
    stop.disabled = true;
    clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
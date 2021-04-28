const newYears = "1 Jan 2022";

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minEl = document.getElementById('minutes');
const secEl = document.getElementById('seconds');

function countdown() {
  const newYearsDate = new Date(newYears);
  const currentDate = new Date();

  const totalSec = (newYearsDate - currentDate) / 1000;
  const days = Math.floor(totalSec / 3600 / 24);
  const hours = Math.floor(totalSec / 3600) % 24;
  const minutes = Math.floor(totalSec/60) % 60;
  const seconds = Math.floor(totalSec) % 60;

  daysEl.innerHTML = days;
  hoursEl.innerHTML = formatTime(hours);
  minEl.innerHTML = formatTime(minutes);
  secEl.innerHTML = formatTime(seconds);

}

function formatTime(time){
    return time < 10 ? (`0${time}`) : time;
}

setInterval(countdown, 1000);
countdown();

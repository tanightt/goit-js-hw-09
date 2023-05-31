import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] < Date.now()) {
        Notiflix.Notify.failure("Please choose a date in the future");
        refs.startBtn.disabled = true;
        return;
      }
      refs.startBtn.disabled = false;
  },
};

flatpickr(refs.inputDate, options);

refs.startBtn.addEventListener('click', onClickStart);

function onClickStart() {
  const timerId = setInterval(() => {
    const deadlineTime = new Date(new Date(refs.inputDate.value));
    const now = Date.now();
    const diffMSec = deadlineTime - now;
    if (diffMSec <= 0) {
      clearInterval(timerId);
      return;
    }
    let { days, hours, minutes, seconds } = convertMs(diffMSec);

    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
    
    refs.startBtn.disabled = true;
    refs.inputDate.disabled = true;
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
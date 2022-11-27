import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  mins: document.querySelector('[data-minutes]'),
  secs: document.querySelector('[data-seconds]'),
  input: document.querySelector('#datetime-picker'),
};

let chosenDate = null;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenDate = selectedDates[0];
  },
});

const timer = {
  start() {
    let currentTime = Date.now();
    let intervalId = null;

    if (chosenDate < currentTime) {
      refs.startBtn.removeAttribute('disabled', 'disabled');
      clearInterval(intervalId);
      Notiflix.Notify.failure('Please choose a date in the future');
      let time = convertMs(0);
      updateClockFace(time);

      return;
    }

    intervalId = setInterval(() => {
      let deltaTime = chosenDate - currentTime;
      console.log(deltaTime);
      let time = convertMs(deltaTime);
      console.log(convertMs(deltaTime));

      updateClockFace(time);
      //   console.log(time);
      currentTime += 1;
      //   console.log(`${days}:${hours}:${minutes}:${seconds}`);
    }, 1000);
  },
};

refs.startBtn.addEventListener('click', () => {
  if (!refs.startBtn.hasAttribute('disable')) {
    refs.startBtn.setAttribute('disabled', 'disabled');
    timer.start();
  }
});

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${minutes}`;
  refs.secs.textContent = `${seconds}`;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

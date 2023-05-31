import Notiflix from 'notiflix';

const refs = {
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  btn: document.querySelector('[type="submit"]'),
}

let { delay, step, amount, btn } = refs;

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {    
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  })
  return promise;
}

btn.addEventListener('click', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  let delayInput = Number(delay.value);
  let stepInput = Number(step.value);
  let amountInput = Number(amount.value);

  for (let i = 1; i <= amountInput; i++) {
    createPromise(i, delayInput)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {useIcon: false});
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {useIcon: false});
  });
    delayInput += stepInput;
  }
}
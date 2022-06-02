import Notiflix from 'notiflix';

const ble = {
  form: document.querySelector('.form'),
};

ble.form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const formsEl = event.currentTarget.elements;

  let amount = Number(formsEl.amount.value);
  let delay = Number(formsEl.delay.value);
  let step = Number(formsEl.step.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ i, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
      })
      .catch(({ i, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const solution = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setInterval(() => {
      if (solution) {
        resolve({ position, delay }); // Fulfill
      } else {
        reject({ position, delay }); // Reject
      }
    }, delay);
  });
}

import './index.html';
import './css/style.css';
// import './sass/style.sass';

const checkbox = document.getElementById('temperatureRegime');
const formHidden = document.querySelector('.form__item-content--hidden');

checkbox.addEventListener('click', () => {
  if (checkbox.checked) {
    formHidden.style.display = 'flex';
  } else {
    formHidden.style.display = 'none';
  }
});

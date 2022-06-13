export default function hederMyLiberary() {
  const search = document.querySelector('.search');
  search.remove();

  const container = document.querySelector('header .container');
  const markup =
    '<div class="btnBlock"><button type="button" class="header__btn watchedBtn activeBtn">watched</button><button type="button" class="header__btn queueBtn">queue</button></div>';
  container.insertAdjacentHTML('beforeend', markup);

  const overlay = document.querySelector('header');
  console.log(overlay);
  overlay.classList.add('overlayMyLiberary');
}

// --------------EXAMPLE-----------

// const btnMyLiabrary = document.querySelector('.nav__link');

// btnMyLiabrary.addEventListener('click', event => {
//   event.preventDefault();
//   hederMyLiberary();
// });

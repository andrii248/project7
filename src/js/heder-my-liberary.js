export default function makeHeader(headerType) {
  const search = document.querySelector('.search');
  const container = document.querySelector('header .container');
  const overlay = document.querySelector('header');
  const buttons = document.querySelector('.btnBlock');
  const activeBtn = document.querySelector('.btnBlock .activeBtn');

  const markup = `
    <div class="btnBlock">
      <button type="button" class="header__btn watchedBtn activeBtn">watched</button>
      <button type="button" class="header__btn queueBtn">queue</button>
      <button type="button" class="header__btn visually-hidden removeBtn">clean watched</button>
    </div>`;

  if (headerType === 'home') {
    search.classList.remove('visually-hidden');
    overlay.classList.remove('overlayMyLiberary');
    buttons.classList.add('visually-hidden');
  } else if (headerType === 'library') {
    search.classList.add('visually-hidden');
    overlay.classList.add('overlayMyLiberary');
    if (!buttons) {
      container.insertAdjacentHTML('beforeend', markup);
    } else {
      buttons.classList.remove('visually-hidden');
      activeBtn.classList.remove('activeBtn');
      buttons.children[0].classList.add('activeBtn');
    }
  }
}

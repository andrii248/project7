const refs = {
  themeBtn: document.querySelector('.theme_toggle'),
  iconSunny: document.querySelector('.icon--sunny'),
  iconMoon: document.querySelector('.icon--moon'),
  modalFooter: document.querySelector('.modal_footer'),
  modal: document.querySelector('.modal'),
  team: document.querySelector('.team'),
  contacts: document.querySelector('.contacts'),
  footer: document.querySelector('.footer'),
  filmCard: document.querySelector('.films__item'),
  buttons: document.querySelectorAll('.switcher__button'),
};

refs.themeBtn.addEventListener('click', switchTheme);

function addDark() {
  if (localStorage.getItem('theme') === 'dark') {
    document.querySelector('html').classList.add('dark');
    refs.iconMoon.classList.add('visually-hidden');
    refs.iconSunny.classList.remove('visually-hidden');
    refs.modal.classList.add('dark_modal');
    refs.modalFooter.classList.add('dark_modal');
    refs.team.classList.add('dark');
    refs.contacts.classList.add('dark');
    refs.footer.classList.add('dark_footer');
    refs.buttons.forEach(button => button.classList.add('switcher__button--dark'));

    setTimeout(() => {
      const changeText = document.querySelectorAll('.films__title');
      for (let title of changeText) {
        title.classList.add('dark');
      }
      const changeCard = document.querySelectorAll('.films__item');
      for (let card of changeCard) {
        card.classList.add('dark_card');
      }
    }, 500);
  } else {
    document.querySelector('html').classList.remove('dark');
    refs.modal.classList.remove('dark_modal');
    refs.modalFooter.classList.remove('dark_modal');
    refs.team.classList.remove('dark');
    refs.contacts.classList.remove('dark');
    refs.footer.classList.remove('dark_footer');
    refs.iconSunny.classList.add('visually-hidden');
    refs.iconMoon.classList.remove('visually-hidden');
    refs.buttons.forEach(button => button.classList.remove('switcher__button--dark'));

    setTimeout(() => {
      const changeText = document.querySelectorAll('.films__title');
      for (let title of changeText) {
        title.classList.remove('dark');
      }
      const changeCard = document.querySelectorAll('.films__item');
      for (let card of changeCard) {
        card.classList.remove('dark_card');
      }
    }, 500);
  }
}

function switchTheme() {
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', 'dark');
  }
  addDark();
}
addDark();

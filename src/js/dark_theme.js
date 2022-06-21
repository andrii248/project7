import './pagination';
import { initPagination } from './pagination';
import { getTrending } from './tmdb';
import { renderPageHome } from './header';
import filmCardsTpl from '../templates/films-cards.js';

const refs = {
  themeBtn: document.querySelector('.theme_toggle'),
  iconSunny: document.querySelector('.icon--sunny'),
  iconMoon: document.querySelector('.icon--moon'),
  modalFooter: document.querySelector('.modal_footer'),
  modal: document.querySelector('.modal'),
  team: document.querySelector('.team'),
  contacts: document.querySelectorAll('.contacts__link'),
  contacts_title: document.querySelector('.contacts__title'),
  footer: document.querySelector('.footer'),
  filmCard: document.querySelector('.films__item'),
  switcherBtn: document.querySelectorAll('.switcher__button'),
  // pagination_number: document.querySelector('.pagination a'),
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
    refs.contacts_title.classList.add('dark');
    refs.footer.classList.add('dark_footer');
    // setTimeout(() => {
    // const pagination_number = document.querySelectorAll('.pagination a');
    // for (let number of pagination_number) {
    //   number.classList.add('dark');
    // }
    // }, 500);
    for (let button of refs.switcherBtn) {
      button.classList.add('dark');
    }

    for (let contact of refs.contacts) {
      contact.classList.add('dark');
    }

    setTimeout(() => {
      const changeText = document.querySelectorAll('.films__title');
      for (let title of changeText) {
        title.classList.add('dark');
      }
      const changeCard = document.querySelectorAll('.films__item');
      for (let card of changeCard) {
        card.classList.add('dark_card');
      }
      const changeEmptyContainer = document.querySelector('.emptyLibrare');
      if (changeEmptyContainer) {
        changeEmptyContainer.classList.add('dark')
      };
    }, 500);
  } else {
    document.querySelector('html').classList.remove('dark');
    refs.modal.classList.remove('dark_modal');
    refs.modalFooter.classList.remove('dark_modal');
    refs.team.classList.remove('dark');
    refs.contacts_title.classList.remove('dark');
    refs.footer.classList.remove('dark_footer');
    refs.iconSunny.classList.add('visually-hidden');
    refs.iconMoon.classList.remove('visually-hidden');

    for (let button of refs.switcherBtn) {
      button.classList.remove('dark');
    }

    for (let contact of refs.contacts) {
      contact.classList.remove('dark');
    }

    setTimeout(() => {
      const changeText = document.querySelectorAll('.films__title');
      for (let title of changeText) {
        title.classList.remove('dark');
      }
      const changeCard = document.querySelectorAll('.films__item');
      for (let card of changeCard) {
        card.classList.remove('dark_card');
      }
      const changeEmptyContainer = document.querySelector('.emptyLibrare');
      if (changeEmptyContainer) {
        changeEmptyContainer.classList.remove('dark');
      }  
    }, 500);
  }

  paginationDark();
}

export function paginationDark() {
  const pagination_number = document.querySelectorAll('.pagination a');
  const pagination_dots = document.querySelector('a.dots');

  if (localStorage.getItem('theme') === 'dark') {
    for (let number of pagination_number) {
      number.classList.add('dark');
    }
    if (pagination_dots) {
      pagination_dots.classList.add('dark');
    }
  } else {
    for (let number of pagination_number) {
      number.classList.remove('dark');
    }
    if (pagination_dots) {
      pagination_dots.classList.remove('dark');
    }
  }
}

export function filmTitleDark() {
  if (localStorage.getItem('theme') === 'dark') {
    setTimeout(() => {
      const changeText = document.querySelectorAll('.films__title');
      for (let title of changeText) {
        title.classList.add('dark');
      }
    }, 500);
  } else {
    setTimeout(() => {
      const changeText = document.querySelectorAll('.films__title');
      for (let title of changeText) {
        title.classList.remove('dark');
      }
    }, 500);
  }
}

export function modalDark() {
      const film_title = document.querySelector('.modal__title');
      const film_values = document.querySelector('.film-values');
      const modal_description = document.querySelector('.modal__description');
      const film_vote = document.querySelector('.film-values__votes--color');
      const modal_close_btn = document.querySelector('.modal__close-btn');
    if (localStorage.getItem('theme') === 'dark') {
      
      console.log(modal_description);
      modal_description.classList.add('dark');
      film_values.classList.add('film-values--dark_theme');
      film_vote.classList.add('film_votes--dark');
      film_title.classList.add('title_dark');
      modal_close_btn.classList.add('modal__close-btn--dark');
    }
    else {
      modal_description.classList.remove('dark');
      film_values.classList.remove('film-values--dark_theme');
      film_vote.classList.remove('film_votes--dark');
      film_title.classList.remove('title_dark');
      modal_close_btn.classList.remove('modal__close-btn--dark');
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

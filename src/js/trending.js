import { getTrending } from './tmdb';
import initPagination from './pagination';
import filmCardsTpl from '../templates/films-cards.js';
import { paginationDark } from './dark_theme';
import { filmTitleDark } from './dark_theme';

//------//
import onClickHomeOfLink from './header';

const logoLink = document.querySelector('.logo');
const homeLink = document.querySelector('.nav__link-home');
//------//

const refs = {
  card: document.querySelector('.films__list'),
  day: document.querySelector('#day'),
  week: document.querySelector('#week'),
};

const getTrendingDay = async page => {
  return await getTrending(page, 'day');
};

const getTrendingWeek = async page => {
  return await getTrending(page, 'week');
};

const renderPage = movies => {
  refs.card.innerHTML = filmCardsTpl(movies);
  filmTitleDark();
};

refs.week.addEventListener('click', onWeekButtonClick);

function onWeekButtonClick() {
  initPagination(getTrendingWeek, renderPage);
  if (!refs.week.classList.contains('switcher__button--active')) {
    refs.day.classList.toggle('switcher__button--active');
    refs.week.classList.toggle('switcher__button--active');
  }

  //Добавляем курср поинтер  и кликабельность на логотип и хоум//

  logoLink.addEventListener('click', onClickHomeOfLink);
  homeLink.addEventListener('click', onClickHomeOfLink);

  logoLink.style.cursor = 'pointer';
  //===========//
}

refs.day.addEventListener('click', onDayButtonClick);

function onDayButtonClick() {
  initPagination(getTrendingDay, renderPage);
  if (!refs.day.classList.contains('switcher__button--active')) {
    refs.day.classList.toggle('switcher__button--active');
    refs.week.classList.toggle('switcher__button--active');
  }

  //--------//
  homeLink.removeEventListener('click', onClickHomeOfLink);
  logoLink.removeEventListener('click', onClickHomeOfLink);
  logoLink.style.cursor = 'default';
  document.querySelector('.search__input').value = '';
  //--------//
}

const initHome = () => {
  onDayButtonClick();
};

initHome();

export { initHome };

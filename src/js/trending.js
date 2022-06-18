import { getTrending } from './tmdb';
import initPagination from './pagination';
import filmCardsTpl from '../templates/films-cards.js';
import { paginationDark } from './dark_theme';
import { filmTitleDark } from './dark_theme';

const refs = {
  card: document.querySelector('.films__list'),
  // buttons: document.querySelectorAll('.switcher__button'),
  day: document.querySelector('#day'),
  week: document.querySelector('#week'),
};

const trendingMarkup = (page, range) => {
  getTrending(page, range).then(data => {
    refs.card.innerHTML = filmCardsTpl(data.movies);
  });
  filmTitleDark();
};

trendingMarkup();

initPagination(getTrending, movies => {
  refs.card.innerHTML = filmCardsTpl(movies);
  paginationDark();
  filmTitleDark();
});

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
  // trendingMarkup(1, 'week');
  initPagination(getTrendingWeek, renderPage);
  if (!refs.week.classList.contains('switcher__button--active')) {
    refs.day.classList.toggle('switcher__button--active');
    refs.week.classList.toggle('switcher__button--active');
  }
}

refs.day.addEventListener('click', onDayButtonClick);

function onDayButtonClick() {
  // trendingMarkup(1, 'day');
  initPagination(getTrendingDay, renderPage);
  if (!refs.day.classList.contains('switcher__button--active')) {
    refs.day.classList.toggle('switcher__button--active');
    refs.week.classList.toggle('switcher__button--active');
  }
}

// onDayButtonClick();
initPagination(getTrendingDay, renderPage);

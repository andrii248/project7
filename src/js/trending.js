import { getTrending } from './tmdb';
import initPagination from './pagination';
import filmCardsTpl from '../templates/films-cards.js';

const refs = {
  card: document.querySelector('.films__list'),
  day: document.querySelector('#day'),
  week: document.querySelector('#week'),
};

const trendingMarkup = (page, range) => {
  getTrending(page, range).then(data => {
    refs.card.innerHTML = filmCardsTpl(data.movies);
  });
};

trendingMarkup();

refs.week.addEventListener('click', onWeekButtonClick);

function onWeekButtonClick() {
  trendingMarkup(1, 'week');
  refs.day.toggleAttribute('disabled');
  refs.week.toggleAttribute('disabled');
}

refs.day.addEventListener('click', onDayButtonClick);

function onDayButtonClick() {
  trendingMarkup(1, 'day');
  refs.day.toggleAttribute('disabled');
  refs.week.toggleAttribute('disabled');
}

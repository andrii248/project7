import initPagination from './pagination';
import { getQueue, getWatched, clearWatched, clearQueue } from './tmdb';
import filmCardsTpl from '../templates/films-cards.js';

const refs = {
  cardsList: document.querySelector('.films__list'),
  container: document.querySelector('header .container'),
  theme: document.querySelector('theme'),
};

export const renderPage = movies =>
  movies.length
    ? (refs.cardsList.innerHTML = filmCardsTpl(movies, false))
    : (refs.cardsList.innerHTML = createMessageEmptyList());

refs.container.addEventListener('click', event => {
  // event.preventDefault();

  const elementClassList = event.target.classList;
  const watchedBtn = document.querySelector('.watchedBtn');
  const queueBtn = document.querySelector('.queueBtn');
  const removeBtn = document.querySelector('.removeBtn');
  const totalPagesWatched = Number(getWatched().totalPages);
  const totalPagesQueue = Number(getQueue().totalPages);
  const pagination = document.querySelector('.pagination');

  if (elementClassList.contains('watchedBtn')) {
    initPagination(getWatched, renderPage);
    watchedBtn.classList.add('activeBtn');
    queueBtn.classList.remove('activeBtn');
    if (getWatched().movies.length === 0) {
      removeBtn.classList.add('visually-hidden');
    } else {
      removeBtn.classList.remove('visually-hidden');
      removeBtn.innerText = 'Clean watched';
    }

    if (totalPagesWatched === 1) {
      pagination.classList.add('visually-hidden');
    } else {
      pagination.classList.remove('visually-hidden');
    }
  }

  if (elementClassList.contains('queueBtn')) {
    initPagination(getQueue, renderPage);
    if (getQueue().movies.length === 0) {
      removeBtn.classList.add('visually-hidden');
    } else {
      removeBtn.classList.remove('visually-hidden');
      removeBtn.innerText = 'Clean queue';
    }
    queueBtn.classList.add('activeBtn');
    watchedBtn.classList.remove('activeBtn');

    if (totalPagesQueue === 1) {
      pagination.classList.add('visually-hidden');
    } else {
      pagination.classList.remove('visually-hidden');
    }
  }

  if (elementClassList.contains('removeBtn')) {
    if (removeBtn.innerText.toLowerCase().includes('watched')) {
      clearWatched();
      initPagination(getWatched, renderPage);
    } else if (removeBtn.innerText.toLowerCase().includes('queue')) {
      clearQueue();
      initPagination(getQueue, renderPage);
    }
    removeBtn.classList.add('visually-hidden');
  }
});

export const createMessageEmptyList = () => {
  const isDarkTheme = localStorage.getItem('theme') === 'dark';
  const darkThemeClass = isDarkTheme ? 'dark' : '';
  return `<div class="emptyLibrare ${darkThemeClass}"><p class="emptyLibrare__text"> your movie list is empty. add a movie to your library</p></div>`;
};

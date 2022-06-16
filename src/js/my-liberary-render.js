import initPagination from './pagination';
import { getQueue, getWatched } from './tmdb';
import filmCardsTpl from '../templates/films-cards.js';

const refs = {
  card: document.querySelector('.films__list'),
  container: document.querySelector('header .container'),
};

const renderPage = movies => refs.card.innerHTML = filmCardsTpl(movies);

refs.container.addEventListener("click", (event) => {
  event.preventDefault();

  const elementClassList = event.target.classList;

  if (elementClassList.contains("watchedBtn")) {
    initPagination(getWatched, renderPage)
  }

  if (elementClassList.contains("queueBtn")) {
    initPagination(getQueue, renderPage)
  }
})

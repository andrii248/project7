import initPagination from './pagination';
import { getQueue, getWatched } from './tmdb';
import filmCardsTpl from '../templates/films-cards.js';
import addDark from './dark_theme';

const refs = {
  card: document.querySelector('.films__list'),
  container: document.querySelector('header .container'),
};

const renderPage = movies => refs.card.innerHTML = filmCardsTpl(movies);

refs.container.addEventListener("click", (event) => {
  event.preventDefault();
  
  const elementClassList = event.target.classList;
  const watchedBtn = refs.container.lastChild.firstChild;
  const queueBtn = refs.container.lastChild.lastChild;
  const totalPagesWatched = Number(getWatched().totalPages);
  const totalPagesQueue = Number(getQueue().totalPages);
  const pagination = document.querySelector('.pagination');
  
  if (elementClassList.contains("watchedBtn")) {
    initPagination(getWatched, renderPage);
    
    watchedBtn.classList.add("activeBtn");
    queueBtn.classList.remove("activeBtn");
    if (totalPagesWatched === 1) {
      pagination.classList.add("visually-hidden");
    } else { pagination.classList.remove("visually-hidden") };
    addDark();
  }

  if (elementClassList.contains("queueBtn")) {
    initPagination(getQueue, renderPage);
    queueBtn.classList.add("activeBtn");
    watchedBtn.classList.remove("activeBtn");
    if (totalPagesQueue === 1) {
      pagination.classList.add("visually-hidden");
    } else { pagination.classList.remove("visually-hidden") };
    addDark();
  }
})

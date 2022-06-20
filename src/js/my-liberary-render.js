import initPagination from './pagination';
import { getQueue, getWatched } from './tmdb';
import filmCardsTpl from '../templates/films-cards.js';

const refs = {
  cardsList: document.querySelector('.films__list'),
  container: document.querySelector('header .container'),
  theme: document.querySelector('theme'),
};

const renderPage = movies =>
  movies.length
  ? refs.cardsList.innerHTML = filmCardsTpl(movies, false)
  : refs.cardsList.innerHTML = createMessageEmptyList();

refs.container.addEventListener("click", (event) => {
  // event.preventDefault();

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

  }

  if (elementClassList.contains("queueBtn")) {
    initPagination(getQueue, renderPage);
    console.log(getWatched().movies.length);
    queueBtn.classList.add("activeBtn");
    watchedBtn.classList.remove("activeBtn");
    if (totalPagesQueue === 1) {
      pagination.classList.add("visually-hidden");
    } else { pagination.classList.remove("visually-hidden") };
  }
})

const createMessageEmptyList = () => {
  return '<div class="emptyLibrare"><p class="emptyLibrare__text"> your movie list is empty. add a movie to your library</p></div>';
}
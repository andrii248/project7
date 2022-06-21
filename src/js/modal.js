import { getMovie, findInWatched, findInQueue, getWatched, getQueue } from './tmdb';
import { renderPage } from './my-liberary-render';
import initPagination from './pagination';
import { modalDark } from './dark_theme';

const refs = {
  movieList: document.querySelector('.films__list'),
  backdrop: document.querySelector('.modal__backdrop'),
  modalContainer: document.querySelector('.modal__container'),
  container: document.querySelector('header'),
  htmlTag: document.querySelector('html'),
};

refs.movieList.addEventListener('click', onShowModal);

async function onShowModal(e) {
  e.preventDefault();
  refs.modalContainer.innerHTML = '';
  refs.htmlTag.classList.add('modal-open');
  if (!e.target.classList.contains('films__img')) {
    return;
  }
  refs.backdrop.classList.remove('is-hidden');
  e.stopPropagation();
  const selectedMovie = e.target.dataset.id;

  getMovieAndUpdateUI(selectedMovie);

  refs.backdrop.addEventListener('click', onCloseModal);
  document.addEventListener('keydown', onEscKeyClose);
}

async function getMovieAndUpdateUI(selectedMovie) {
  try {
    const movie = await getMovie(selectedMovie);
    const { id, title, originalTitle, about, image, genres, popularity, vote, votes } =
      movie.forMarkup;
    const { desktop, tablet, mobile } = image;
    const modalMarkup = `
      <div class="modal__thumb trailer__picture">
         <picture>
            <source srcset=${desktop} media="(min-width: 1200px)">
            <source srcset=${tablet} media="(min-width: 768px)">
            <source srcset=${mobile} media="(min-width: 320px)">
            <img src=${desktop} alt=${title} class="modal__img">
            <div class="trailer__btn" data-id="${id}">
            <img class='youtube-icon' src='https://download.logo.wine/logo/YouTube/YouTube-Icon-Full-Color-Logo.wine.png' width='90' height='"70'/>
            <p class="trailer__text">watch trailer</p>
            </div>
        </picture>
      </div>
      <div class="modal__content">
        <p class="modal__title">${title}</p>
        <div class="modal__box">
          <div class="film-features">
            <p class="film-features__text">Vote / Votes</p>
            <p class="film-features__text">Popularity</p>
            <p class="film-features__text">Original Title</p>
            <p class="film-features__text">Genre</p>
          </div>
          <div class="film-values">
            <p class="film-values__text">
              <span class="film-values__vote film-values__vote--color">${vote}</span>
              <span class="film-values__slash">/</span>
              <span class="film-values__vote film-values__votes--color">${votes}</span>
            </p>
            <p class="film-values__text">
              <span class="film-value__vote">${popularity.toFixed(1)}</span>
            </p>
            <p class="film-values__text">
              <span class="film-values__vote">${originalTitle}</span>
            </p>
            <p class="film-values__text">
              <span class="film-values__vote">${genres}</span>
            </p>
          </div>
        </div>
        <div class="modal__description">
          <p class="modal__about">About</p>
          <p class="modal__text">${about}</p>
        </div>
        <div class="modal__btn-box" data-id="${id}">
          <button class="modal__btn modal__btn--watched" type="button">Add to watched</button>
          <button class="modal__btn modal__btn--queue" type="button">Add to queue</button>
        </div>
      </div>`;

    refs.modalContainer.insertAdjacentHTML('beforeend', modalMarkup);
    modalDark();
  } catch (e) {
    console.log(e);
  }
  // перевірка чи є фільм в локал-сторедж для зміни тексту

  const btnWatched = document
    .querySelector('.modal__container')
    .getElementsByClassName('modal__btn modal__btn--watched');
  const btnQueue = document
    .querySelector('.modal__container')
    .getElementsByClassName('modal__btn modal__btn--queue');
  console.log(btnWatched[0].childNodes[0].data);

  if (findInWatched(Number(selectedMovie))) {
    btnWatched[0].childNodes[0].data = 'Remove from watched';
  }

  if (findInQueue(Number(selectedMovie))) {
    btnQueue[0].childNodes[0].data = 'Remove from queue';
  }
}

function onCloseModal(e) {
  if (e.target.closest('.modal') && !e.target.closest('.modal__close-btn')) {
    return;
  }

  renderLiberyAfterCloseModal();
  refs.backdrop.classList.add('is-hidden');
  refs.htmlTag.classList.remove('modal-open');
  refs.backdrop.removeEventListener('click', onCloseModal);
  document.removeEventListener('keydown', onEscKeyClose);
}

function onEscKeyClose(e) {
  if (e.code === 'Escape') {
    renderLiberyAfterCloseModal();
    refs.backdrop.classList.add('is-hidden');
    refs.htmlTag.classList.remove('modal-open');
    refs.backdrop.removeEventListener('click', onCloseModal);
    document.removeEventListener('keydown', onEscKeyClose);
  }
}

function renderLiberyAfterCloseModal() {
  const watcheBtn = document.querySelector('.watchedBtn');
  const queueBtn = document.querySelector('.queueBtn');

  if (refs.container.className === 'overlay overlayMyLiberary') {
    if (watcheBtn.classList.value === 'header__btn watchedBtn activeBtn') {
      initPagination(getWatched, renderPage);
    }
    if (queueBtn.classList.value === 'header__btn queueBtn activeBtn') {
      initPagination(getQueue, renderPage);
    }
  }
}

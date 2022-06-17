import { getMovie } from './tmdb';

const refs = {
  movieList: document.querySelector('.films__list'),
  backdrop: document.querySelector('.modal__backdrop'),
  modalContainer: document.querySelector('.modal__container'),
};

refs.movieList.addEventListener('click', onShowModal);

async function onShowModal(e) {
  e.preventDefault();
  refs.modalContainer.innerHTML = '';

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
      <div class="modal__thumb">
         <picture>
            <source srcset=${desktop} media="(min-width: 1200px)">
            <source srcset=${tablet} media="(min-width: 768px)">
            <source srcset=${mobile} media="(min-width: 320px)">
            <img src=${desktop} alt=${title} class="modal__img">
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
  } catch (error) {
    console.log(error);
  }
}

function onCloseModal(e) {
  if (e.target.closest('.modal') && !e.target.closest('.modal__close-btn')) {
    return;
  }

  refs.backdrop.classList.add('is-hidden');
  refs.backdrop.removeEventListener('click', onCloseModal);
  document.removeEventListener('keydown', onEscKeyClose);
}

function onEscKeyClose(e) {
  if (e.code === 'Escape') {
    refs.backdrop.classList.add('is-hidden');
    refs.backdrop.removeEventListener('click', onCloseModal);
    document.removeEventListener('keydown', onEscKeyClose);
  }
}

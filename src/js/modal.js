import { getMovie } from './tmdb';

const refs = {
  modal: document.querySelector('.modal'),
  movieList: document.querySelector('.films__list'),
  backdrop: document.querySelector('.modal__backdrop'),
  closeBtn: document.querySelector('.modal__close-btn'),
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
  const selectedMovie = e.target.dataset.id;

  getMovie(selectedMovie)
    .then(data => {
      const { title, originalTitle, about, image, year, genres, popularity, vote, votes } =
        data.forMarkup;
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
        <div class="modal__btn-box">
          <button class="modal__btn modal__btn--watched" type="button">Add to watched</button>
          <button class="modal__btn modal__btn--queue" type="button">Add to queue</button>
        </div>
      </div>`;
      refs.modalContainer.insertAdjacentHTML('beforeend', modalMarkup);
    })
    .catch(e => console.log(e));

  refs.closeBtn.addEventListener('click', onCloseModal);
  refs.backdrop.addEventListener('click', onBackdropClick);
  document.addEventListener('keydown', onEscKeyClose);
}

async function onCloseModal(e) {
  refs.backdrop.classList.add('is-hidden');
  refs.closeBtn.removeEventListener('click', onCloseModal);
}

async function onEscKeyClose(e) {
  if (e.code === 'Escape') {
    refs.backdrop.classList.add('is-hidden');
  }
  document.removeEventListener('keydown', onEscKeyClose);
}

async function onBackdropClick(e) {
  if (e.target.classList.contains('modal__backdrop')) {
    refs.backdrop.classList.add('is-hidden');
  }
  refs.backdrop.removeEventListener('click', onBackdropClick);
}

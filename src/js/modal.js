import { getMovie } from './tmdb';
import modalCardTpl from '../templates/modal.hbs';

const modalRef = document.querySelector('.modal__window');
const movieCardRef = document.querySelector('.films__item');

// movieCardRef.addEventListener('click', onOpenModal);
// function onOpenModal(e) {
//   e.preventDefault();
// }

getMovie(705861)
  .then(data => {
    const modalMarkup = modalCardTpl(data.forMarkup);
    modalRef.innerHTML = modalMarkup;
  })
  .catch(e => console.log(e));

// const { title, originalTitle, about, image, year, genres, popularity, vote, votes } =
//   data.forMarkup;
// const { desktop, tablet, mobile } = image;

import initPagination from './pagination';
import { getWatched } from './tmdb';
import filmCardsTpl from '../templates/films-cards.js';
import makeHeader from './heder-my-liberary';

// makeHeader('library');

const watchedBtn = document.querySelector(".watchedBtn");
const myLibraryLink = document.querySelector(".nav__link-library");
const homeLink = document.querySelector(".nav__link-home");
console.log(watchedBtn);

const refs = {
  card: document.querySelector('.films__list'),
};

const renderPageMyLibrary = movies => {
  const watchedMovies = getWatched(movies);
  console.log(watchedMovies);
  refs.card.innerHTML = filmCardsTpl(watchedMovies.movies);
};

watchedBtn.addEventListener("click", initPagination(getWatched, renderPageMyLibrary));
myLibraryLink.addEventListener("click", () => { 
  makeHeader('library');
  initPagination(getWatched, renderPageMyLibrary);
});
// homeLink.addEventListener("click",() => console.log("wark"));
  // initPagination(getWatched, renderPageMyLibrary));
// const renderPageMyLibrary = (movies) => {
//   clearFilmsList();

//   refs.card.innerHTML = filmCardsTpl(movies);
//   console.log(movies);
// };


  
  

// console.log(watchedBtn);

// addEventListener("click", initPagination(getWatched, renderPageMyLibrary));

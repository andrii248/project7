import makeHeader from './heder-my-liberary';
import initPagination from './pagination';
import { getTrending, getWatched } from './tmdb';
import filmCardsTpl from '../templates/films-cards.js';

const refs = {
  logoLink: document.querySelector('.logo'),
  homeLink: document.querySelector('.nav__link-home'),
  myLibraryLink: document.querySelector('.nav__link-library'),
  moviesList: document.querySelector('.films__list'),
  switcher: document.querySelector('.switcher'),
};

refs.logoLink.addEventListener('click', e => e.preventDefault());
refs.homeLink.addEventListener('click', e => e.preventDefault());
refs.myLibraryLink.addEventListener('click', onClickMyLibraryLink);

function onClickMyLibraryLink(event) {
  refs.logoLink.addEventListener('click', onClickHomeLink);
  refs.homeLink.addEventListener('click', onClickHomeLink);
  event.preventDefault();
  refs.homeLink.parentElement.classList.remove('nav__item--active');
  refs.myLibraryLink.parentElement.classList.add('nav__item--active');
  refs.switcher.classList.add('visually-hidden');
  makeHeader('library');
  window.history.pushState('object or string', 'Title', '/mylibrary');
  refs.moviesList.innerHTML = '';
  initPagination(getWatched, renderPageLibrary);
}

function onClickHomeLink(event) {
  console.log('I clicked home link');
  event.preventDefault();
  refs.homeLink.parentElement.classList.add('nav__item--active');
  refs.myLibraryLink.parentElement.classList.remove('nav__item--active');
  makeHeader('home');
  window.history.pushState('object or string', 'Title', '/');
  refs.homeLink.removeEventListener('click', onClickHomeLink);
  refs.logoLink.removeEventListener('click', onClickHomeLink);
  refs.switcher.classList.remove('visually-hidden');
  refs.moviesList.innerHTML = '';
  initPagination(getTrending, renderPageHome);
  initHome();
}

const renderPageHome = movies => {
  refs.moviesList.innerHTML = filmCardsTpl(movies);
};

const renderPageLibrary = movies => {
  refs.moviesList.innerHTML = filmCardsTpl(movies, false);
};

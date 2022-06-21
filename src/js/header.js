import makeHeader from './heder-my-liberary';
import initPagination from './pagination';
import { getWatched } from './tmdb';
import { initHome } from './trending.js';
import filmCardsTpl from '../templates/films-cards.js';
import { filmTitleDark } from './dark_theme';
import { renderPage } from './my-liberary-render';

export const refs = {
  logoLink: document.querySelector('.logo'),
  homeLink: document.querySelector('.nav__link-home'),
  myLibraryLink: document.querySelector('.nav__link-library'),
  moviesList: document.querySelector('.films__list'),
  switcher: document.querySelector('.switcher'),
};
let pathname = '';

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
  initPagination(getWatched, renderPage);
  if (getWatched().movies.length > 0) {
    document.querySelector('.removeBtn').classList.remove('visually-hidden');
  }

  filmTitleDark();
  refs.logoLink.style.cursor = 'pointer';
}

function onClickHomeLink(event) {
  event.preventDefault();
  refs.homeLink.parentElement.classList.add('nav__item--active');
  refs.myLibraryLink.parentElement.classList.remove('nav__item--active');

  makeHeader('home');

  window.history.pushState('object or string', 'Title', pathname);
  refs.homeLink.removeEventListener('click', onClickHomeLink);
  refs.logoLink.removeEventListener('click', onClickHomeLink);
  refs.switcher.classList.remove('visually-hidden');
  refs.moviesList.innerHTML = '';
  document.querySelector('.search__input').value = '';
  filmTitleDark();
  initHome();
  refs.logoLink.style.cursor = 'default';
}

function onClickHomeOfLink(event) {
  event.preventDefault();
  refs.homeLink.removeEventListener('click', onClickHomeOfLink);
  refs.logoLink.removeEventListener('click', onClickHomeOfLink);
  refs.switcher.classList.remove('visually-hidden');
  refs.moviesList.innerHTML = '';
  document.querySelector('.search__input').value = '';
  filmTitleDark();
  initHome();
  refs.logoLink.style.cursor = 'default';
}

window.addEventListener('load', event => {
  if (!location.href.includes('mylibrary')) {
    pathname = location.pathname;
  }
  console.log(pathname);
  if (location.href.includes('mylibrary')) {
    window.history.pushState('object or string', 'Title', pathname);
    onClickMyLibraryLink(event);
  }
});

export default onClickHomeOfLink;

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
  refs.logoLink.addEventListener('click', onClickHomeLinkFromLibrary);
  refs.homeLink.addEventListener('click', onClickHomeLinkFromLibrary);
  event.preventDefault();
  refs.homeLink.parentElement.classList.remove('nav__item--active');
  refs.myLibraryLink.parentElement.classList.add('nav__item--active');
  refs.switcher.classList.add('visually-hidden');
  makeHeader('library');
  if (!(event.type === 'popstate')) {
    const libraryPath = pathname + 'mylibrary';
    window.history.pushState('object or string', 'Title', libraryPath);
  }
  refs.moviesList.innerHTML = '';
  initPagination(getWatched, renderPage);
  if (getWatched().movies.length > 0) {
    document.querySelector('.removeBtn').classList.remove('visually-hidden');
  }
  refs.moviesList.classList.add('films__list--library');
  filmTitleDark();
  refs.logoLink.style.cursor = 'pointer';
}

function onClickHomeLinkFromLibrary(event) {
  refs.homeLink.parentElement.classList.add('nav__item--active');
  refs.myLibraryLink.parentElement.classList.remove('nav__item--active');
  makeHeader('home');
  if (!(event.type === 'popstate')) {
    let headerPath;
    window.history.pushState('object or string', 'Title', pathname);
  }
  onClickHomeOfLink(event);
  refs.moviesList.classList.remove('films__list--library');
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
});

window.addEventListener('beforeunload', event => {
  if (location.href.includes('mylibrary')) {
    location = location.href.replace('mylibrary', '');
    onClickMyLibraryLink(event);
  }
});

window.addEventListener('popstate', e => {
  if (window.location.pathname === pathname) {
    onClickHomeLinkFromLibrary(e);
  } else if (window.location.pathname.includes('/mylibrary')) {
    onClickMyLibraryLink(e);
  }
});

export default onClickHomeOfLink;

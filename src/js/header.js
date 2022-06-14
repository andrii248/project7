import makeHeader from './heder-my-liberary';

const refs = {
  logoLink: document.querySelector('.logo'),
  homeLink: document.querySelector('.nav__link-home'),
  myLibraryLink: document.querySelector('.nav__link-library'),
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
  makeHeader('library');
  window.history.pushState('object or string', 'Title', '/mylibrary');
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
}

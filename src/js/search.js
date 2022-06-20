import { searchMovie, getTrending } from './tmdb';
import onClickHomeOfLink from './header';
// import { spiner } from './loader';
import initPagination from './pagination';
import filmCardsTpl from '../templates/films-cards.js';

/*============*/
const switcher = document.querySelector('.switcher');
/*============*/
const form = document.querySelector('.search');
const renderPageHome = movies => {
  document.querySelector('.films__list').innerHTML = filmCardsTpl(movies);
};
const logoLink = document.querySelector('.logo');
const homeLink = document.querySelector('.nav__link-home');

form.addEventListener('submit', e => {
  e.preventDefault();

  const query = document.querySelector('.search__input').value.trim();
  if (query !== '') {
    const getPageSearchMovie = async page => {
      // spiner.spinerStart();
      const data = await searchMovie(query, page);
      if (data.movies.length === 0) {
        const errorMessage = document.querySelector('.search-error');
        errorMessage.classList.remove('is-hidden');
        setTimeout(() => {
          errorMessage.classList.add('is-hidden');
        }, 3000);
      } else if (data.movies.length !== 0) {
        /*==========*/
        switcher.classList.add('visually-hidden');
      }
      /*==========*/
      // spiner.spinerEnd();
      return data;
    };

    getPageSearchMovie().then(data => {
      if (data.movies.length !== 0) {
        initPagination(getPageSearchMovie, renderPageHome);
      }
    });
    // document.querySelector('.search__input').value = '';
    logoLink.addEventListener('click', onClickHomeOfLink);
    homeLink.addEventListener('click', onClickHomeOfLink);
    logoLink.style.cursor = 'pointer';
  }
});

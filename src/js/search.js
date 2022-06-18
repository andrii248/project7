import { searchMovie, getTrending } from './tmdb';
import initPagination from './pagination';
import filmCardsTpl from '../templates/films-cards.js';

/*============*/
const switcher = document.querySelector('.switcher');
/*============*/
const form = document.querySelector('.search');
const renderPageHome = movies => {
  document.querySelector('.films__list').innerHTML = filmCardsTpl(movies);
};

form.addEventListener('submit', e => {
  e.preventDefault();
  /*==========*/
  switcher.classList.add('visually-hidden');
  /*==========*/
  const query = document.querySelector('.search__input').value.trim();
  if (query !== '') {
    const getPageSearchMovie = async page => {
      const data = await searchMovie(query, page);
      if (data.movies.length === 0) {
        const errorMessage = document.querySelector('.search-error');
        errorMessage.classList.remove('is-hidden');
        setTimeout(() => {
          errorMessage.classList.add('is-hidden');
        }, 3000);
      }
      return data;
    };

    getPageSearchMovie().then(data => {
      if (data.movies.length !== 0) {
        initPagination(getPageSearchMovie, renderPageHome);
      }
    });

    document.querySelector('.search__input').value = '';
  }
});

import initPagination from './pagination';
import { getTrending, searchMovie, getWatched, getQueue } from './tmdb';

const renderPage = movies => {
  console.log(movies);
};

const renderPageHome = movies => {
  refs.card.innerHTML = filmCardsTpl(movies);
};

const renderPageMyLibrary = movies => {
  console.log(movies);
};
/*
initPagination(getTrending, renderPageHome);

const getPageSearchMovie = async page => { 
  const query = document.querySelector('.search__input').value;
  const data = await searchMovie(query, page);
  return data;
};
initPagination(getPageSearchMovie, renderPageHome);

initPagination(getWatched, renderPageMyLibrary);
initPagination(getQueue, renderPageMyLibrary);
*/

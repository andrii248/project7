import initPagination from './pagination';
import { getWatched } from './tmdb';

const renderPageMyLibrary = movies => {
  console.log(movies);
};

const watchedBtn = document.querySelector("button .watchedBtn");
console.log(watchedBtn);

watchedBtn.addEventListener("click", initPagination(getWatched, renderPageMyLibrary));

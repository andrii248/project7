import initPagination from './pagination';
import { getQueue } from './tmdb';

const renderPageMyLibrary = movies => {
  console.log(movies);
};

const queueBtn = document.querySelector("button .queueBtn");
console.log(queueBtn);

queueBtn.addEventListener("click", initPagination(getQueue, renderPageMyLibrary));

import { paginationDark } from './dark_theme';
import onClickHomeOfLink from './header';
import { spiner } from './loader';

const logoLink = document.querySelector('.logo');
const homeLink = document.querySelector('.nav__link-home');

const pagination = document.querySelector('.pagination');

let getPageFunction;
let renderPageFunction;

const initPagination = (getPage, renderPage) => {
  getPageFunction = getPage;
  renderPageFunction = renderPage;
  setPage(1);
};

export const setPage = async page => {
  spiner.spinerStart();
  const data = await getPageFunction(page);
  renderPageFunction(data.movies);
  renderPagination(data.page, data.totalPages);
  window.scrollTo(0, 0);
  spiner.spinerEnd();
};

const renderPagination = (page, totalPages) => {
  const buttons = [];
  if (totalPages > 1) {
    const isMobile = window.matchMedia('(max-width: 600px)').matches;
    let min = isMobile ? page - 1 : page - 2;
    if (min < 1) {
      min = 1;
    }
    let max = isMobile ? page + 1 : page + 2;
    if (max > totalPages) {
      max = totalPages;
    }
    if (page > 1 && !isMobile) {
      buttons.push(`<a class="arrow arrow--left" data-page="${page - 1}"></a>`);
    }
    if (min > 1) {
      buttons.push(`<a data-page="${1}">${1}</a>`);
    }
    if (min > 2) {
      buttons.push(`<a class="dots"></a>`);
    }
    for (let i = min; i <= max; i += 1) {
      if (i === page) {
        buttons.push(`<a class="active" data-page="${i}">${i}</a>`);
      } else {
        buttons.push(`<a data-page="${i}">${i}</a>`);
      }
    }
    if (max < totalPages - 1) {
      buttons.push(`<a class="dots"></a>`);
    }
    if (max < totalPages) {
      buttons.push(`<a data-page="${totalPages}">${totalPages}</a>`);
    }
    if (page < totalPages && !isMobile) {
      buttons.push(`<a class="arrow arrow--right" data-page="${page + 1}"</a>`);
    }
  }
  pagination.innerHTML = buttons.join('');
  paginationDark();
};

pagination.addEventListener('click', e => {
  if (e.target.nodeName !== 'A') {
    return;
  }
  e.preventDefault();
  const page = Number(e.target.dataset.page);
  if (!Number.isNaN(page)) {
    setPage(page);

    if (page === 1) {
      logoLink.removeEventListener('click', onClickHomeOfLink);
      homeLink.removeEventListener('click', onClickHomeOfLink);
      logoLink.style.cursor = 'default';
    } else {
      logoLink.addEventListener('click', onClickHomeOfLink);
      homeLink.addEventListener('click', onClickHomeOfLink);
      logoLink.style.cursor = 'pointer';
    }
  }
});

export default initPagination;

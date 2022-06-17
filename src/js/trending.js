import { getTrending } from './tmdb';
import initPagination from './pagination';
import filmCardsTpl from '../templates/films-cards.js';

const refs = {
  card: document.querySelector('.films__list'),
  day: document.querySelector('#day'),
  week: document.querySelector('#week'),
};

const trendingMarkup = (page, range) => {
  getTrending(page, range).then(data => {
    refs.card.innerHTML = filmCardsTpl(data.movies);
  });
  if (localStorage.getItem('theme') === 'dark') {setTimeout(() => {
         const changeText = document.querySelectorAll('.films__title');         
         for (let title of changeText) {
             title.classList.add('dark');
  }
}
    , 500);
  }
  else {
        setTimeout(() => {
         const changeText = document.querySelectorAll('.films__title');         
         for (let title of changeText) {
             title.classList.remove('dark');
  }
},500)
  }
};

//trendingMarkup();

initPagination(getTrending, movies => {
  refs.card.innerHTML = filmCardsTpl(movies);
   if (localStorage.getItem('theme') === 'dark') {setTimeout(() => {
         const changeText = document.querySelectorAll('.films__title');         
         for (let title of changeText) {
             title.classList.add('dark');
  }
},500);}
});

refs.week.addEventListener('click', onWeekButtonClick);

function onWeekButtonClick() {
  trendingMarkup(1, 'week');
  refs.day.toggleAttribute('disabled');
  refs.week.toggleAttribute('disabled');
}

refs.day.addEventListener('click', onDayButtonClick);

function onDayButtonClick() {
  trendingMarkup(1, 'day');
  refs.day.toggleAttribute('disabled');
  refs.week.toggleAttribute('disabled');
}

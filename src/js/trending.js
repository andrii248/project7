import { getTrending } from './tmdb';
import filmCardsTpl from '../templates/films-cards.js';

const refs = {
  card: document.querySelector('.films__list'),
};

const trendingMarkup = page => {
  getTrending(page).then(data => {
    refs.card.innerHTML = filmCardsTpl(data.movies);
  });
};

trendingMarkup();

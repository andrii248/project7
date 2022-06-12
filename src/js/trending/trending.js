import TrendingApi from './trendingAPI';
import trendingMarkup from './trendingMarkup';

const refs = {
  card: document.querySelector('.films__list'),
};

const searchTrending = new TrendingApi();

async function trendingFilms() {
  try {
    const data = await searchTrending.fetchTrendingFilms();
    console.log(data.data.results);
    console.log(trendingMarkup(data.data.results));
    refs.card.innerHTML = trendingMarkup(data.data.results);
  } catch (error) {}
}

trendingFilms();

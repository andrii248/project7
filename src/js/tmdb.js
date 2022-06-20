import axios from 'axios';
import storage from './storage';
import images from '../images/background/*.jpg';

const API_KEY = 'c1c0e09e2b2780ccf5e67712da2ef6c9';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGES_BASE_URL = 'https://image.tmdb.org/t/p';

let genres = JSON.parse(
  `[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]`
);

const initialize = async () => {
  const params = new URLSearchParams({
    api_key: API_KEY,
  });
  const response = await axios.get(`${BASE_URL}/genre/movie/list?${params}`);
  return response.data;
};

initialize()
  .then(data => {
    genres = data.genres;
  })
  .catch(e => console.log(e));

/*
Image sizes:
            "w92",
            "w154",
            "w185",
            "w342",
            "w500",
            "w780",
            "original"
*/

const getImageUrl = (path, size) => {
  return path ? `${IMAGES_BASE_URL}/${size}${path}` : images[size];
};

const getImage = path => {
  return {
    desktop: getImageUrl(path, 'w780'),
    tablet: getImageUrl(path, 'w500'),
    mobile: getImageUrl(path, 'w342'),
  };
};

const getGenresString = ids => {
  return ids
    .map(id => {
      const genre = genres.find(genre => genre.id === id);
      return genre ? genre.name : '';
    })
    .filter((el, index) => index < 2)
    .join(', ');
};

const prepareForMarkup = ({ id, title, poster_path, release_date, genre_ids, vote_average }) => {
  return {
    id: id,
    title: title,
    image: getImage(poster_path),
    year: new Date(release_date).getFullYear(),
    genres: getGenresString(genre_ids),
    vote: vote_average,
  };
};

const getTrending = async (page = 1, range = 'day') => {
  const params = new URLSearchParams({
    api_key: API_KEY,
    page: page,
  });
  const response = await axios.get(`${BASE_URL}/trending/movie/${range}?${params}`);
  const data = response.data;
  return {
    page: data.page,
    totalPages: data.total_pages,
    movies: data.results.map(result => prepareForMarkup(result)),
  };
};

const searchMovie = async (query, page = 1) => {
  const params = new URLSearchParams({
    api_key: API_KEY,
    page: page,
    query: query,
  });
  const response = await axios.get(`${BASE_URL}/search/movie?${params}`);
  const data = response.data;
  return {
    page: data.page,
    totalPages: data.total_pages,
    movies: data.results.map(result => prepareForMarkup(result)),
  };
};

const getMovie = async id => {
  const params = new URLSearchParams({
    api_key: API_KEY,
  });
  const response = await axios.get(`${BASE_URL}/movie/${id}?${params}`);
  const data = response.data;
  return {
    forMarkup: {
      id: data.id,
      title: data.title,
      image: getImage(data.poster_path),
      year: new Date(data.release_date).getFullYear(),
      genres: data.genres.map(genre => genre.name).join(', '),
      vote: data.vote_average,
      votes: data.vote_count,
      popularity: data.popularity,
      originalTitle: data.original_title,
      about: data.overview,
    },
    forSaving: {
      id: data.id,
      title: data.title,
      poster_path: data.poster_path,
      release_date: data.release_date,
      genre_ids: data.genres.map(genre => genre.id),
      vote_average: data.vote_average,
    },
  };
};

const KEY_WATCHED = 'watched';
const KEY_QUEUE = 'queue';
const PAGE_LIMIT = 20;

const store = {
  watched: storage.load(KEY_WATCHED) || [],
  queue: storage.load(KEY_QUEUE) || [],
};

const addToStore = (key, forSaving) => {
  if (findInStore(key, forSaving.id)) {
    return;
  }
  store[key].push(forSaving);
  storage.save(key, store[key]);
};

const addToWatched = forSaving => {
  addToStore(KEY_WATCHED, forSaving);
};

const addToQueue = forSaving => {
  addToStore(KEY_QUEUE, forSaving);
};

const getFromStore = (key, page) => {
  const array = store[key];
  const totalPages = Math.ceil(array.length / PAGE_LIMIT);
  const begin = (page - 1) * PAGE_LIMIT;
  const end = begin + PAGE_LIMIT <= array.length ? begin + PAGE_LIMIT : array.length;
  return {
    page: page,
    totalPages: totalPages,
    movies: array.slice(begin, end).map(item => prepareForMarkup(item)),
  };
};

const getWatched = (page = 1) => {
  return getFromStore(KEY_WATCHED, page);
};

const getQueue = (page = 1) => {
  return getFromStore(KEY_QUEUE, page);
};

const findIndexInStore = (key, id) => {
  return store[key].findIndex(item => item.id === id);
};

const findInStore = (key, id) => {
  return findIndexInStore(key, id) !== -1;
};

const findInWatched = id => {
  return findInStore(KEY_WATCHED, id);
};

const findInQueue = id => {
  return findInStore(KEY_QUEUE, id);
};

const removeFromStore = (key, id) => {
  const index = findIndexInStore(key, id);
  if (index !== -1) {
    store[key].splice(index, 1);
    storage.save(key, store[key]);
  }
};

const removeFromWatched = id => {
  removeFromStore(KEY_WATCHED, id);
};

const removeFromQueue = id => {
  removeFromStore(KEY_QUEUE, id);
};

const clearStore = key => {
  store[key] = [];
  storage.remove(key);
};

const clearWatched = () => {
  clearStore(KEY_WATCHED);
};

const clearQueue = () => {
  clearStore(KEY_QUEUE);
};

const getTrailerUrl = async id => {
  const params = new URLSearchParams({
    api_key: API_KEY,
  });
  const response = await axios.get(`${BASE_URL}/movie/${id}/videos?${params}`);
  const data = response.data;
  let item = data.results.find(r => r.site === 'YouTube' && r.type === 'Trailer');
  if (item) {
    return `https://www.youtube.com/embed/${item.key}`;
  }
  item = data.results.find(r => r.site === 'Vimeo' && r.type === 'Trailer');
  if (item) {
    return `https://player.vimeo.com/video/${r.key}`;
  }
  return null;
};

export {
  getTrending,
  searchMovie,
  getMovie,
  addToWatched,
  addToQueue,
  getWatched,
  getQueue,
  getTrailerUrl,
  findInWatched,
  findInQueue,
  removeFromWatched,
  removeFromQueue,
  clearWatched,
  clearQueue,
};

// // EXAMPLES
// searchMovie('movie')
//   .then(data => {
//     console.log('Search movie', data);
//   })
//   .catch(e => console.log(e));
/*
getTrending(10)
  .then(data => {
    console.log('Get trending', data);
  })
  .catch(e => console.log(e));



getMovie(705861)
  .then(data => {
    console.log('Get movie', data);
    addToWatched(data.forSaving);
    addToQueue(data.forSaving);
  })
  .catch(e => console.log(e));

console.log('Get watched', getWatched(1));
console.log('Get queue', getQueue(1));

getTrailerUrl(705861).then(url => {
  console.log(url);
}).catch(e => { 
  console.log(e);
});

*/

/*
// === removeFromWatched(id), removeFromQueue(id)
const id = 508363;
if (findInWatched(id)) {
  removeFromWatched(id);
}

if (findInQueue(id)) {
  removeFromQueue(id);
}
*/

/*
//=== clear local storage
clearWatched();
clearQueue();
*/

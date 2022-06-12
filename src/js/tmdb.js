import axios from 'axios';

const API_KEY = 'c1c0e09e2b2780ccf5e67712da2ef6c9';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGES_BASE_URL = 'https://image.tmdb.org/t/p';

let genres = JSON.parse(
  `[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]`,
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

// TODO create and test image w92.jpg, w154.jpg, ..., original.jpg

const getImageUrl = (path, size) => {
  return path ? `${IMAGES_BASE_URL}/${size}${path}` : '/images/${size}.jpg';
};

const getImage = path => {
  return {
    desktop: getImageUrl(path, 'w500'),
    tablet: getImageUrl(path, 'w342'),
    mobile: getImageUrl(path, 'w185'),
  };
};

const getGenresString = ids => {
  return ids
    .map(id => {
      const genre = genres.find(genre => genre.id === id);
      return genre ? genre.name : '';
    })
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

const getTrending = async (page = 1) => {
  const params = new URLSearchParams({
    api_key: API_KEY,
    page: page,
  });
  const response = await axios.get(`${BASE_URL}/trending/movie/day?${params}`);
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

const addToWatched = forSaving => {
  console.log('In progress');
};

const addToQueue = forSaving => {
  console.log('In progress');
};

const getWathed = page => {
  console.log('In progress');
  return {
    page: page,
    totalPages: 0,
    movies: [],
  };
};

const geQueue = page => {
  console.log('In progress');
  return {
    page: page,
    totalPages: 0,
    movies: [],
  };
};

export { getTrending, searchMovie, getMovie };

// EXAMPLES

getTrending(10)
  .then(data => {
    console.log('Get trending', data);
  })
  .catch(e => console.log(e));

searchMovie('movie')
  .then(data => {
    console.log('Search movie', data);
  })
  .catch(e => console.log(e));

getMovie(705861)
  .then(data => {
    console.log('Get movie', data);
  })
  .catch(e => console.log(e));

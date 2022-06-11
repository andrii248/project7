import axios from 'axios';

export default class TrendingApi {
  constructor() {}

  fetchTrendingFilms() {
    const BASE_URL = 'https://api.themoviedb.org/3/trending/films/week';

    const options = {
      params: {
        api_key: 'c1c0e09e2b2780ccf5e67712da2ef6c9',
      },
    };

    return axios.get(BASE_URL, options);
  }
}

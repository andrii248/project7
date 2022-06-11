export default function trendingMarkup(arr) {
  return arr
    .map(({ poster_path, name, original_name, release_date }) => {
      return `
      <li class="films__item">
      <img
    src="https://image.tmdb.org/t/p/w500/${poster_path}"
    alt="${name}"
    width=100%
    loading="lazy"
  />
  <h2>${original_name}</h2>
  <p>${release_date}</p>
      </li>
        `;
    })
    .join('');
}

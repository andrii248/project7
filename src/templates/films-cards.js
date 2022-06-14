export default function filmCardsTpl(movies) {
  return movies
    .map(
      ({ image, title, genres, year, id }) => `<li class="films__item">
    <a class="films__link" href="#">
      <img
        class="films__img"
        src = 'https://image.tmdb.org/t/p/w500/${image.desktop}';
        width = '100%';
        alt="${title}"
        data-id='${id}'
        loading="lazy"
      />
      <h2 class="films__title">${title}</h2>
      <p class="films__info">
        ${genres} | ${year}
      </p>
    </a>
  </li>`
    )
    .join('');
}

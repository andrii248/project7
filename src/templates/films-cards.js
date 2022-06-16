export default function filmCardsTpl(movies, votesHidden = true) {
  const votesVisibleValue = votesHidden ? 'visually-hidden' : '';
  return movies
    .map(
      ({ image, title, genres, year, vote, id }) => `<li class="films__item">
    <a class="films__link" href="#">
      <img
        class="films__img"
        src = '${image.desktop}';
        width = '100%';
        alt="${title}"
        data-id='${id}'
        loading="lazy"
      />
      <h2 class="films__title">${title}</h2>
      <p class="films__info">
        ${genres} | ${year} <span class="films__vote ${votesVisibleValue}">${vote}</span>
      </p>
    </a>
  </li>`
    )
    .join('');
}

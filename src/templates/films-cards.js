export default function filmCardsTpl(movies, votesHidden = true) {
  const votesVisibleValue = votesHidden ? 'visually-hidden' : '';
  return movies
    .map(
      ({ image, title, genres, year, vote, id }) => `<li class="films__item">
    <a class="films__link" href="#">
      <picture>
            <source srcset=${image.desktop} media="(min-width: 1024px)">
            <source srcset=${image.tablet} media="(min-width: 768px)">
            <source srcset=${image.mobile} media="(max-width: 767px)">
            <img class="films__img" src=${image.desktop} width = '100%' alt=${title}" data-id='${id}' loading="lazy">
      </picture>
      <h2 class="films__title">${title}</h2>
      <p class="films__info">
        ${genres} | ${year} <span class="films__vote ${votesVisibleValue}">${vote}</span>
      </p>
    </a>
  </li>`
    )
    .join('');
}

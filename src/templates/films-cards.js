export default function filmCardsTpl(movies, votesHidden = true) {
  const votesVisibleValue = votesHidden ? 'visually-hidden' : '';
  const isDarkTheme = localStorage.getItem('theme') === 'dark';
  const darkThemeCardClass = isDarkTheme ? "dark_card" : "";
  const darkThemeTitleClass = isDarkTheme ? "dark" : "";
  return movies
    .map(
      ({ image, title, genres, year, vote, id }) => `<li class="films__item ${darkThemeCardClass}">
    <a class="films__link" href="#">\
      <div class="picture__wrap">
        <picture>
              <source srcset=${image.desktop} media="(min-width: 1024px)">
              <source srcset=${image.tablet} media="(min-width: 768px)">
              <source srcset=${image.mobile} media="(max-width: 767px)">
              <img class="films__img" src=${image.desktop} width = '100%' alt=${title}" data-id='${id}' loading="lazy">
        </picture>
      </div>
      <h2 class="films__title ${darkThemeTitleClass}">${title}</h2>
      <p class="films__info">
        ${genres} | ${year} <span class="films__vote ${votesVisibleValue}">${vote}</span>
      </p>
    </a>
  </li>`
    )
    .join('');
}

import { addToWatched, getWathed } from "./tmdb";
// import filmCardsTpl from '../templates/films-cards.hbs';

// export default function addFilm
const API_KEY = 'c1c0e09e2b2780ccf5e67712da2ef6c9';
const BASE_URL = 'https://api.themoviedb.org/3';
    
// localStorage.setItem("film:", { name: "Boys", genre: "action", id: "77777" });

document.addEventListener("click", () => {
    // localStorage.clear();
    addToWatched("133");
    console.log(getWathed(1));
    watchedMarkup();
})

const refs = {
    card: document.querySelector('.films__list'),
};

const watchedMarkup = page => {
    getWathed(page).then(data => {
        refs.card.innerHTML = "";  
        refs.card.innerHTML = filmCardsTpl(data.movies);
  });
};



// document.addEventListener("click", () => {
//     addToWatched("131");
//     console.log(getWathed(16));
// })

// function fetchSearchFilm() {
//     const searchUrl = `$BASE_URL/${filmId}?$API_KEY&language=en&external_source=imdb_id`

//     return fetch(url)
//         .then(response => {
//             if (response.ok) return response.json();
//             throw new Error();
//         })
    
// }    
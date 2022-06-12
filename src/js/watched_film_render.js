import { addToWatched, getWathed } from "./tmdb";

// export default function addFilm
const API_KEY = 'c1c0e09e2b2780ccf5e67712da2ef6c9';
const BASE_URL = 'https://api.themoviedb.org/3';
    
// localStorage.setItem("film:", { name: "Boys", genre: "action", id: "77777" });

document.addEventListener("click", () => {
    addToWatched("12");
    console.log(getWathed(1));
})

function fetchSearchFilm() {
    const searchUrl = `$BASE_URL/${filmId}?$API_KEY&language=en&external_source=imdb_id`

    return fetch(url)
        .then(response => {
            if (response.ok) return response.json();
            throw new Error();
        })
    
}    
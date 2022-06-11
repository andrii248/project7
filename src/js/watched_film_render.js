// export default function addFilm

localStorage.setItem("film:", { name: "Boys", genre: "action", id: "77777" });

function renderWatchedFromLocalStorage() { 
    console.log(localStorage.getItem("film"));
}
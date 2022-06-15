import { addToWatched, addToQueue, getMovie } from '../js/tmdb';

const refs = {
    modalContainer: document.querySelector('.modal__container'),
}

refs.modalContainer.addEventListener('click', btnClick);

function btnClick(e) {
    let btnName = e.target.className;
    let filmId = e.target.parentElement.dataset.id;

    if (btnName === 'modal__btn modal__btn--watched') {
        getMovie(filmId)
            .then(data => { addToWatched(data.forSaving) })
            .catch(e => console.log(e));
    }
    if (btnName === 'modal__btn modal__btn--queue') {
        getMovie(filmId)
            .then(data => { addToQueue(data.forSaving) })
            .catch(e => console.log(e));
    }
}
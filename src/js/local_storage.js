import { addToWatched, addToQueue, getMovie,findInWatched,removeFromWatched,findInQueue,removeFromQueue } from '../js/tmdb';

const refs = {
    modalContainer: document.querySelector('.modal__container'),
}

refs.modalContainer.addEventListener('click', btnClick);

function btnClick(e) {
    const btnName = e.target.className;
    const filmId = Number(e.target.parentElement.dataset.id);
    // if (btnName !== 'modal__btn modal__btn--watched') { return };
    if (btnName === 'modal__btn modal__btn--watched') {
        if (findInWatched(filmId)) {
            removeFromWatched(filmId);
            e.target.textContent = 'Add to watched';
        }
        else {
            getMovie(filmId)
            .then(data => { addToWatched(data.forSaving)})
                .catch(e => console.log(e));
            e.target.textContent = 'Remove from watched';
            
        }
    }
    if (btnName === 'modal__btn modal__btn--queue') {
        if (findInQueue(filmId)) {
            removeFromQueue(filmId);
            e.target.textContent = 'Add to queue';
        }
        else {
            getMovie(filmId)
            .then(data => { addToQueue(data.forSaving) })
                .catch(e => console.log(e));
            e.target.textContent = 'Remove from queue';
        }
    }
    
}
import { getTrailerUrl } from "./tmdb";
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const refs = {
    modalContainer: document.querySelector('.modal__container'),
}

refs.modalContainer.addEventListener('click', iconTrailerClick);

function iconTrailerClick(e) {
    let id = Number(e.target.closest('div').dataset.id);
    const trailerBtn = e.target.className;
    // console.log(trailerBtn);
    if (trailerBtn === 'youtube-icon' && "trailer__text") {
        getTrailerUrl(id)
            .then(url => {renderTrailer(url)
            })
            .catch(e => {
                console.log(e);
            });
    }
}
let instance;

function renderTrailer(url) {
    const markup = `<iframe class="trailer-player" width="420" height="315" src="${url}" frameborder="0" allowfullscreen></iframe>`;
    instance = basicLightbox.create(markup);
    
    instance.show();
};
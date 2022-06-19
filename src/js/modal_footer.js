const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modalFt: document.querySelector('[data-modal]'),
    htmlTag: document.querySelector("html"),
  };

  refs.openModalBtn.addEventListener('click', onOpenModal);
  refs.closeModalBtn.addEventListener('click', onCloseModal);
  refs.modalFt.addEventListener('click', onBackdropClick);


function onOpenModal(e) {
  e.preventDefault();
  window.addEventListener('keydown', onEscKeyPress);
  refs.modalFt.classList.remove('backdrop--is-hidden');
  refs.htmlTag.classList.add('modal-open');

}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.modalFt.classList.add('backdrop--is-hidden');
  refs.htmlTag.classList.remove('modal-open');
 

}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
     onCloseModal();
  }
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}
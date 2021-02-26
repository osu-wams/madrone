/**
 * Adds a modal with opacity around the whole site
 * Currently used for the home left menu "OSU Menu"
 */
function toggleModal() {
  const body = document.querySelector('body');
  const main = document.getElementById('main-container');
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.modal-overlay');
  overlay.classList.toggle('tw-hidden');
  modal.classList.toggle('tw-hidden');
  body.classList.toggle('modal-active');
  main.classList.toggle('tw-pointer-events-none');
}

/**
 * Modal for OSU Menu
 */
function modalSetup() {
  const openmodal = document.querySelectorAll('.modal-open');
  for (let i = 0; i < openmodal.length; i++) {
    openmodal[i].addEventListener('click', function(event) {
      event.preventDefault();
      toggleModal();
    });
  }

  const overlay = document.querySelector('.modal-overlay');
  overlay.addEventListener('click', toggleModal);

  var closemodal = document.querySelectorAll('.modal-close');
  for (let i = 0; i < closemodal.length; i++) {
    closemodal[i].addEventListener('click', toggleModal);
  }
}

export { toggleModal, modalSetup };

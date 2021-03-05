import {toggleModal, toggleNavModal} from "./modal";

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

  // Modal for navigation menu
  const openMobileNavMenu = document.querySelectorAll('.modal-nav-open');
  for (let i = 0; i < openMobileNavMenu.length; i++) {
    openMobileNavMenu[i].addEventListener('click', toggleNavModal);
  }
}

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

function toggleNavModal() {
  const navModal = document.querySelector('.navModal');
  navModal.classList.toggle('tw-hidden');
  if (navModal.classList.contains('tw-hidden')) {
    closeNavModal();
  } else {
    openNavModal();
  }
}

function closeNavModal() {
  const navModal = document.querySelector('.navModal');
  const menuButton = document.querySelector('.modal-nav-open');
  // I'm heavily relying on the order of the children not changing. We may want to consider using ID or Class
  const menuButtonIcon = menuButton.children[0];
  const menuButtonText = menuButton.children[1];
  navModal.classList.add('tw-hidden');
  menuButtonIcon.setAttribute('data-icon', 'bars');
  menuButtonText.innerText = 'Menu';
}

function openNavModal() {
  const navModal = document.querySelector('.navModal');
  const menuButton = document.querySelector('.modal-nav-open');
  // I'm heavily relying on the order of the children not changing. We may want to consider using ID or Class
  const menuButtonIcon = menuButton.children[0];
  const menuButtonText = menuButton.children[1];
  navModal.classList.remove('tw-hidden');
  menuButtonIcon.setAttribute('data-icon', 'times');
  menuButtonText.innerText = 'Close';
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

  // Modal for navigation menu
  const openMobileNavMenu = document.querySelectorAll('.modal-nav-open');
  for (let i = 0; i < openMobileNavMenu.length; i++) {
    openMobileNavMenu[i].addEventListener('click', toggleNavModal);
  }
  // copying the search into the menu
  const searchBlockForm = document.getElementById('block-madrone-search');
  const mobileNavSearch = document.getElementById('mobile-nav-search');
  mobileNavSearch.innerHTML = searchBlockForm.innerHTML;



}

export { toggleModal, modalSetup, toggleNavModal, closeNavModal, openNavModal };

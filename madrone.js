/**
 * Add Event Listeners to the Main navigation level 0.
 * @type {HTMLCollectionOf<Element>}
 */
let megaMenuParent = document.getElementsByClassName('mega-menu-parent');
for (i = 0; i < megaMenuParent.length; i++) {
  megaMenuParent[i].addEventListener('click', e => {
    // Remove any active menu items
    let headerHeight = document
      .getElementsByTagName('header')[0]
      .getBoundingClientRect().bottom;
    // If the parent is active ignore the class swap.
    if (!e.target.parentElement.classList.contains('is-active')) {
      if (e.target.parentElement.classList.contains('tw-font-normal')) {
        e.target.parentElement.classList.remove(
          'tw-font-normal',
          'tw-text-neutral-550',
          'hover-tw-text-neutral-700'
        );
        e.target.parentElement.classList.add(
          'tw-text-osuorange',
          'tw-font-bold',
          'hover-tw-text-osuorange'
        );
      } else {
        e.target.parentElement.classList.remove(
          'tw-text-osuorange',
          'tw-font-bold',
          'hover-tw-text-osuorange'
        );
        e.target.parentElement.classList.add(
          'tw-font-normal',
          'tw-text-neutral-550',
          'hover-tw-text-neutral-700'
        );
      }
    }
    let childMenuItem = e.target.parentElement.getElementsByClassName(
      'mega-menu'
    );
    /*
      Only close all the mega menus if we are trying to open a NEW mega menu. Otherwise
      just close what is already open first. This fixes an issue we were having where
      you couldn't reselect a menu item to close the mega menu.
     */
    if (childMenuItem.length > 0) {
      childMenuItem[0].style.top = (headerHeight + 5) / 16 + 'rem';
      if (!childMenuItem[0].classList.contains('lg-tw-grid')) {
        closeMegaMenu();
      }
      childMenuItem[0].classList.toggle('lg-tw-grid');
    } else {
      closeMegaMenu();
    }
  });
}

/**
 * Modal for OSU Menu
 */
var openmodal = document.querySelectorAll('.modal-open');
for (var i = 0; i < openmodal.length; i++) {
  openmodal[i].addEventListener('click', function (event) {
    event.preventDefault();
    toggleModal();
  });
}

const overlay = document.querySelector('.modal-overlay');
overlay.addEventListener('click', toggleModal);

var closemodal = document.querySelectorAll('.modal-close');
for (var i = 0; i < closemodal.length; i++) {
  closemodal[i].addEventListener('click', toggleModal);
}
/**
 * Add an event listener on the whole window for escape and close the Mega Menu and toggle to modal if open.
 */
document.addEventListener('keydown', e => {
  // keyCode is deprecated but left in for legacy browsers.
  var key = e.key || e.keyCode;
  if (key === 'Escape' || key === 'Esc' || key === 27) {
    closeMegaMenu();
    if (document.body.classList.contains('modal-active')) {
      toggleModal();
    }
  }
});

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
 * Close mega menu items.
 */
function closeMegaMenu() {
  let openMegaMenus = document.getElementsByClassName('mega-menu');
  for (i = 0; i < openMegaMenus.length; i++) {
    openMegaMenus[i]?.classList.remove('lg-tw-grid');
  }
  let openMegaMenuParents = document.getElementsByClassName('mega-menu-parent');
  for (i = 0; i < openMegaMenuParents.length; i++) {
    if (!openMegaMenuParents[i].classList.contains('is-active')) {
      openMegaMenuParents[i].classList.remove('tw-text-osuorange', 'tw-font-bold', 'hover-tw-text-osuorange');
      openMegaMenuParents[i].classList.add('tw-font-normal', 'tw-text-neutral-550', 'hover-tw-text-neutral-700');
    }
  }
}

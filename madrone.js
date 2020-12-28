/**
 * Add Event Listeners to the Main navigation level 0.
 * @type {HTMLCollectionOf<Element>}
 */
let megaMenuParent = document.getElementsByClassName('mega-menu-parent');
for (i = 0; i < megaMenuParent.length; i++) {
  megaMenuParent[i].addEventListener('click', e => {
    /*
      looks like child elements are getting this click event. this makes sure that the code
      is only firing if the parent element has the class mega-menu-parent
     */
    //if (!e.target.parentElement.classList.contains('mega-menu-parent')) return;

    // Remove any active menu items
    let headerHeight = document
      .getElementsByTagName('header')[0]
      .getBoundingClientRect().bottom;
    // If the parent is active ignore the class swap.
    // if (!e.target.parentElement.classList.contains('is-active')) {
    //   if (e.target.parentElement.classList.contains('tw-font-normal')) {
    //     e.target.parentElement.classList.remove(
    //       'tw-font-normal',
    //       'tw-text-neutral-550',
    //       'hover-tw-text-neutral-700'
    //     );
    //     e.target.parentElement.classList.add(
    //       'tw-text-osuorange',
    //       'tw-font-bold',
    //       'hover-tw-text-osuorange'
    //     );
    //   } else {
    //     e.target.parentElement.classList.remove(
    //       'tw-text-osuorange',
    //       'tw-font-bold',
    //       'hover-tw-text-osuorange'
    //     );
    //     e.target.parentElement.classList.add(
    //       'tw-font-normal',
    //       'tw-text-neutral-550',
    //       'hover-tw-text-neutral-700'
    //     );
    //   }
    // }

    // e.target == <span>
    // e.target.parentElement = <li>
    let childMenuItem = e.target.parentElement.getElementsByClassName(
      'mega-menu'
    );
    console.log(childMenuItem);

    let megaMenuExists = childMenuItem.length > 0;



    // fix the lighting



    // fix the menu opening/closing




    /*
      Only close all the mega menus if we are trying to open a NEW mega menu. Otherwise
      just close what is already open first. This fixes an issue we were having where
      you couldn't reselect a menu item to close the mega menu.
     */
    if (megaMenuExists) {
      let megaMenuDiv = childMenuItem[0];
      let megaMenuIsOpen = megaMenuDiv.classList.contains('lg-tw-grid');
      megaMenuDiv.style.top = (headerHeight + 5) / 16 + 'rem';

      setActiveColors(e.target.parentElement, megaMenuIsOpen);
      setActiveMegaMenu(megaMenuDiv, megaMenuIsOpen);
    }
  });
}
/**
 * new functions
 */
function setActiveMegaMenu(arg1, arg2) {
  let openMegaMenus = document.getElementsByClassName('mega-menu');

  for (i = 0; i < openMegaMenus.length; i++) {
    openMegaMenus[i]?.classList.remove('lg-tw-grid');
  }

  if (arg2) {
    // mega menu currently open and is going to close
  } else {
    arg1.classList.add('lg-tw-grid');
  }


}

function setActiveColors(arg1, arg2) {
  // arg1 == e.target.parentElement | <li>
  // arg2 == megaMenuIsOpen | bool

  let openMegaMenuParents = document.getElementsByClassName('mega-menu-parent');

  // resets color on all non active mega menu parent items
  for (i = 0; i < openMegaMenuParents.length; i++) {
    if (!openMegaMenuParents[i].parentElement.classList.contains('is-active')) {
      openMegaMenuParents[i].parentElement.classList.remove('tw-text-osuorange', 'tw-font-bold', 'hover-tw-text-osuorange');
      openMegaMenuParents[i].parentElement.classList.add('tw-font-normal', 'tw-text-neutral-550', 'hover-tw-text-neutral-700');
    } else {
      openMegaMenuParents[i].parentElement.classList.remove('tw-font-normal', 'tw-text-neutral-550', 'hover-tw-text-neutral-700');
      openMegaMenuParents[i].parentElement.classList.add('tw-text-osuorange', 'tw-font-bold', 'hover-tw-text-osuorange');
    }
  }

  if (arg2) {
    // mega menu currently open and is going to close | don't highlight selection
  } else {
    arg1.classList.remove(
      'tw-font-normal',
      'tw-text-neutral-550',
      'hover-tw-text-neutral-700',
    );
    arg1.classList.add(
      'tw-text-osuorange',
      'tw-font-bold',
      'hover-tw-text-osuorange',
    );
  }
}


/**
 * End of new crap
 */

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
  // closes all the mega menus
  let openMegaMenus = document.getElementsByClassName('mega-menu');
  for (i = 0; i < openMegaMenus.length; i++) {
    openMegaMenus[i]?.classList.remove('lg-tw-grid');
  }
  let openMegaMenuParents = document.getElementsByClassName('mega-menu-parent');
  // resets color on all non active mega menu parent items
  for (i = 0; i < openMegaMenuParents.length; i++) {
    if (!openMegaMenuParents[i].parentElement.classList.contains('is-active')) {
      openMegaMenuParents[i].parentElement.classList.remove('tw-text-osuorange', 'tw-font-bold', 'hover-tw-text-osuorange');
      openMegaMenuParents[i].parentElement.classList.add('tw-font-normal', 'tw-text-neutral-550', 'hover-tw-text-neutral-700');
    }
  }
}

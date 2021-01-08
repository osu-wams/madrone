/**
 * Add Event Listeners to the Main navigation level 0.
 * @type {HTMLCollectionOf<Element>}
 */
let megaMenuParent = document.getElementsByClassName('mega-menu-parent');

/**
 * Adds click event that toggles the Mega Menu to mega menu parent items
 */
for (i = 0; i < megaMenuParent.length; i++) {
  megaMenuParent[i].addEventListener('click', e => {
    let megaMenuParentLi = e.target.closest("li");

    // Determines the height that the mega menu should open at
    let headerHeight = document
      .getElementsByTagName('header')[0]
      .getBoundingClientRect().bottom;

    // Gets all the child pages
    let childMenuItem = megaMenuParentLi.getElementsByClassName(
      'mega-menu'
    );
    let megaMenuExists = childMenuItem.length > 0;

    /**
     * Checks to see if a mega menu should exist. If so, we determine if we are opening/closing the
     * menu and pass that information into the functions that handle it.
     */
    if (megaMenuExists) {
      let megaMenuDiv = childMenuItem[0];
      let megaMenuIsOpen = megaMenuDiv.classList.contains('lg-tw-grid');
      megaMenuDiv.style.top = (headerHeight + 5) / 16 + 'rem';
      setActiveColors(megaMenuParentLi, megaMenuIsOpen);
      setActiveMegaMenu(megaMenuDiv, megaMenuIsOpen);
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
  setActiveColors();
  setActiveMegaMenu();
}

// Mega Menu Functions

/**
 * Resets all the colors on the mega menu parents. If the mega menu is being opened, will change the color of the
 * corresponding mega menu parent item to orange. Also flips the cheveron.
 */
function setActiveColors(arg1 = null, arg2 = null) {

  // arg1 == e.target.parentElement | <li>
  // arg2 == megaMenuIsOpen | bool
  let openMegaMenuParents = document.getElementsByClassName('mega-menu-parent');

  // resets color on all non active mega menu parent items
  for (i = 0; i < openMegaMenuParents.length; i++) {

    // openMegaMenuParents[i].parentElement.classList.remove('tw-border-bot-custom')
    openMegaMenuParents[i].parentElement.classList.remove('tw-border-osuorange')
    openMegaMenuParents[i].parentElement.classList.remove('tw-text-osuorange', 'hover-tw-text-osuorange');
    openMegaMenuParents[i].parentElement.classList.add('tw-font-normal', 'tw-text-neutral-550', 'hover-tw-text-neutral-700');

    // Checks to see if there is a chevron. If so, reset it to down
    if (openMegaMenuParents[i].parentElement.children[1]) {
      openMegaMenuParents[i].parentElement.children[1].setAttribute('data-icon', 'caret-down')
    }
  }
  if (arg2) {

    // mega menu currently open and is going to close | don't highlight selection
  } else if (arg1 != null) {

    // If this function was invoked from our click event on the mega menu parent, we want to highlight it
    arg1.classList.remove(
      'tw-font-normal',
      'tw-text-neutral-550',
      'hover-tw-text-neutral-700',
    );
    arg1.classList.add(
      'tw-text-osuorange',
      'hover-tw-text-osuorange',
    );

    // Sets a orange border on the mega menu parent LI that was selected
    arg1.getElementsByClassName('mega-menu-parent')[0].parentElement.classList.add('tw-border-osuorange')
    arg1.children[1].setAttribute('data-icon', 'caret-up')
  }
}

/**
 * Hides all the mega menus. Will then add lg-tw-grid to arg1 IFF arg2 is true and arg1 is not null
 */
function setActiveMegaMenu(arg1 = null, arg2 = null) {
  let openMegaMenus = document.getElementsByClassName('mega-menu');
  for (i = 0; i < openMegaMenus.length; i++) {
    openMegaMenus[i]?.classList.remove('lg-tw-grid');
  }
  if (arg2) {
    // mega menu currently open and is going to close
  } else if (arg1 != null) {
    arg1.classList.add('lg-tw-grid');
  }
}


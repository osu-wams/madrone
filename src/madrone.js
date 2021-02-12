import { adjustMoreMenu, closeMoreMenu, createMoreMenu } from './js/more-menu';
import {
  setActiveColors,
  setActiveMegaMenu,
  closeMegaMenu
} from './js/mega-menu';
import { toggleModal, modalSetup } from './js/modal';
/**
 * Add Event Listeners to the Main navigation level 0.
 * @type {HTMLCollectionOf<Element>}
 */

modalSetup();

createMoreMenu('block-madrone-main-menu', 'madrone-mega-menu-main');
createMoreMenu('block-madrone-groupmenu', 'madrone-mega-menu-group');
// Adapt immediately on load.
// Set a width on the site title to better calculate the space of the menu items
const siteTitle = document.querySelector('.site-name');
siteTitle.style.width = `${siteTitle.innerText.length * 11}px`;
// adjustMoreMenu();
window.addEventListener('load', () => {
  adjustMoreMenu('block-madrone-main-menu', 'madrone-mega-menu-main');
  adjustMoreMenu('block-madrone-groupmenu', 'madrone-mega-menu-group');
});
// Adapt on window resize.
window.addEventListener('resize', () => {
  adjustMoreMenu('block-madrone-main-menu', 'madrone-mega-menu-main');
  adjustMoreMenu('block-madrone-groupmenu', 'madrone-mega-menu-group');
});

const megaMenuParent = document.getElementsByClassName('mega-menu-parent');

/**
 * Adds click event that toggles the Mega Menu to mega menu parent items
 */
for (var i = 0; i < megaMenuParent.length; i++) {
  megaMenuParent[i].addEventListener('click', e => {
    // closes all more menus if a mege menu is toggled
    // e.preventDefault();
    let megaMenuParentLi = e.target.closest('li');

    // Determines the height that the mega menu should open at
    let headerHeight = document
      .getElementsByTagName('header')[0]
      .getBoundingClientRect().bottom;

    // Gets all the child pages
    const megaMenus = megaMenuParentLi.getElementsByClassName(
      'madrone-mega-menu-container'
    );
    let megaMenuExists = megaMenus.length > 0;

    /**
     * Checks to see if a mega menu should exist. If so, we determine if we are opening/closing the
     * menu and pass that information into the functions that handle it.
     */

    if (megaMenuExists) {
      let megaMenuDiv = megaMenus[0];
      let megaMenuIsOpen = megaMenuDiv.classList.contains('lg-tw-grid');
      megaMenuDiv.style.top = headerHeight / 16 + 'rem';

      setActiveColors(megaMenuParentLi, megaMenuIsOpen);
      setActiveMegaMenu(megaMenuDiv, megaMenuIsOpen);
    }
  });
}

/**
 * Add an event listener on the whole window for escape and close the Mega Menu and toggle to modal if open.
 */
document.addEventListener('keyup', e => {
  // keyCode is deprecated but left in for legacy browsers.
  const key = e.key || e.keyCode;
  if (key === 'Escape' || key === 'Esc' || key === 27) {
    closeMegaMenu();
    if (document.body.classList.contains('modal-active')) {
      toggleModal();
    }
    closeMoreMenu();
  }
});

/**
 * Closes more menus whenever there is a click anywhere
 * Except something that toggles the mega menu, and the more button itself
 */
document.addEventListener('click', e => {
  e.stopPropagation();
  if (
    e.target &&
    !e.target.classList.contains('more-button') &&
    !e.target.classList.contains('mega-menu-parent')
  ) {
    closeMoreMenu();
  }
});

const closeButton = document.querySelectorAll('.closeMegaMenu');
for (let i = 0; i < closeButton.length; i++) {
  closeButton[i].addEventListener('click', closeMegaMenu);
}

// Mega Menu Functions

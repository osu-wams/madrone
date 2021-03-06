import { closeMegaMenu, megaMenuToggle, megaMenuChildSetTitle } from './js/mega-menu';
import { adjustMoreMenu, closeAllMoreMenus, createMoreMenu } from './js/more-menu';
import { toggleModal, modalSetup, closeNavModal, closeMobileGroupMenuDropdown } from './js/modal';
/**
 * Add Event Listeners to the Main navigation level 0.
 * @type {HTMLCollectionOf<Element>}
 */

modalSetup();

createMoreMenu('block-madrone-main-menu', 'madrone-mega-menu-main');
createMoreMenu('block-madrone-groupmenu', 'madrone-mega-menu-group');

megaMenuToggle();
megaMenuChildSetTitle();
// Adapt immediately on load.

window.addEventListener('load', () => {
  adjustMoreMenu('block-madrone-main-menu', 'madrone-mega-menu-main');
  adjustMoreMenu('block-madrone-groupmenu', 'madrone-mega-menu-group');
});
// Adapt on window resize.
window.addEventListener('resize', () => {
  adjustMoreMenu('block-madrone-main-menu', 'madrone-mega-menu-main');
  adjustMoreMenu('block-madrone-groupmenu', 'madrone-mega-menu-group');
});

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
    closeAllMoreMenus();
    closeNavModal();
    closeMobileGroupMenuDropdown();
  }
});

/**
 * Closes more menus whenever there is a click anywhere
 * Except something that toggles the mega menu, and the more button itself
 */
document.addEventListener('click', e => {
  if (
    e.target &&
    !e.target.classList.contains('more-button') &&
    !e.target.classList.contains('fa-ellipsis-h') &&
    !e.target.closest('ul')?.classList.contains('madrone-more-menu') &&
    !e.target.parentElement.classList.contains('more-button') &&
    !e.target.parentElement.classList.contains('fa-ellipsis-h') ||
    e.target.closest('button')?.classList.contains('closeMegaMenu')
  ) {
    closeAllMoreMenus();
  }
});

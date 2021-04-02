import { actAsButton } from './utils';
/**
 * Hides all the mega menus. Will then add lg-tw-grid to megaMenuDiv if menuIsOpen is true and megaMenuDiv is not null
 */
function setActiveMegaMenu(megaMenuDiv = null, menuIsOpen = false) {
  const openMegaMenus = document.getElementsByClassName(
    'madrone-mega-menu-container lg-tw-grid'
  );

  if (openMegaMenus) {
    for (let i = 0; i < openMegaMenus.length; i++) {
      openMegaMenus[i].classList.remove('lg-tw-grid');
    }
  }

  if (megaMenuDiv && !menuIsOpen) {
    megaMenuDiv.classList.add('lg-tw-grid');
  }
}

/**
 * Resets all the colors on the mega menu parents. If the mega menu is being opened, will change the color of the
 * corresponding mega menu parent item to orange. Also flips the cheveron.
 */
function setActiveColors(megaMenuParentLi = null, menuIsOpen = false) {
  // megaMenuParentLi == e.target.parentElement | <li>
  // menuIsOpen == megaMenuIsOpen | bool
  let openMegaMenuParents = document.getElementsByClassName('mega-menu-parent');

  // resets color on all non active mega menu parent items
  for (let i = 0; i < openMegaMenuParents.length; i++) {
    let parentLi = openMegaMenuParents[i].parentElement;
    parentLi.classList.remove(
      'tw-text-osuorange',
      'madrone-active-trail',
      'hover-tw-text-osuorange'
    );
    parentLi.classList.add('tw-font-normal', 'tw-text-neutral-550');

    // Checks to see if there is a chevron. If so, reset it to down
    if (parentLi.children[1]) {
      parentLi.children[1].setAttribute('data-icon', 'caret-down');
    }
  }

  // If this function was invoked from our click event on the mega menu parent, we want to highlight it
  if (megaMenuParentLi && !menuIsOpen) {
    megaMenuParentLi.classList.remove('tw-font-normal', 'tw-text-neutral-550');
    megaMenuParentLi.classList.add(
      'tw-text-osuorange',
      'hover-tw-text-osuorange'
    );

    // Sets a orange border on the mega menu parent LI that was selected
    megaMenuParentLi
      .getElementsByClassName('mega-menu-parent')[0]
      .parentElement.classList.add('madrone-active-trail');
    megaMenuParentLi.children[1].setAttribute('data-icon', 'caret-up');
  }
}

/**
 * Add click events to all link items with mega menus
 */
function megaMenuToggle() {
  const megaMenuParent = document.getElementsByClassName('mega-menu-parent');

  // Adds event listener to close MegaMenu
  const closeButton = document.querySelectorAll('.closeMegaMenu');
  if (closeButton) {
    for (let i = 0; i < closeButton.length; i++) {
      closeButton[i].addEventListener('click', closeMegaMenu);
    }
  }

  /**
   * Adds click event that toggles the Mega Menu to mega menu parent items
   */
  for (let i = 0; i < megaMenuParent.length; i++) {
    megaMenuParent[i].addEventListener('click', e => {
      const megaMenuParentLi = e.target.closest('li');

      // Gets all the child pages
      const megaMenus = megaMenuParentLi.getElementsByClassName(
        'madrone-mega-menu-container'
      );
      const megaMenuExists = megaMenus.length > 0;

      /**
       * Checks to see if a mega menu should exist. If so, we determine if we are opening/closing the
       * menu and pass that information into the functions that handle it.
       */

      if (megaMenuExists) {
        const megaMenuDiv = megaMenus[0];
        const megaMenuIsOpen = megaMenuDiv.classList.contains('lg-tw-grid');
        // This needs to be calculated here, calculating it outside causes problems when logged in with admin toolbar
        const bottomHeader = document
          .querySelector('[role=banner]')
          .getBoundingClientRect().bottom;
        megaMenuDiv.style.top = bottomHeader + 'px';

        setActiveColors(megaMenuParentLi, megaMenuIsOpen);
        setActiveMegaMenu(megaMenuDiv, megaMenuIsOpen);
      }
    });

    // Spans can now be clicked with keyboard and spacebar
    actAsButton(megaMenuParent[i]);
  }
}

/**
 * Close mega menu items.
 */
function closeMegaMenu() {
  setActiveColors();
  setActiveMegaMenu();
}

function megaMenuChildSetTitle() {
  const megaMenuChildArr = document.querySelectorAll('.mega-menu-child > a')
  for (let i = 0; i < megaMenuChildArr.length; i++) {
    const v1 = megaMenuChildArr[i];
    if (v1.children.length > 1) {
      const parent = v1.parentElement;
      const removed = v1.removeChild(v1.firstChild);
      removed.classList.add('tw-absolute', 'tw--left-6', 'tw-top-1');
      parent.insertBefore(removed, parent.firstChild);
    }
  }
}

export { setActiveColors, setActiveMegaMenu, closeMegaMenu, megaMenuToggle, megaMenuChildSetTitle };

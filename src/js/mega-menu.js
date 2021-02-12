/**
 * Hides all the mega menus. Will then add lg-tw-grid to megaMenuDiv IFF menuIsOpen is true and megaMenuDiv is not null
 */
function setActiveMegaMenu(megaMenuDiv = null, menuIsOpen = false) {
  let openMegaMenus = document.getElementsByClassName(
    'madrone-mega-menu-container'
  );
  for (let i = 0; i < openMegaMenus.length; i++) {
    openMegaMenus[i]?.classList.remove('lg-tw-grid');
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
    parentLi.classList.add(
      'tw-font-normal',
      'tw-text-neutral-550',
      'hover-tw-text-neutral-700'
    );

    // Checks to see if there is a chevron. If so, reset it to down
    if (parentLi.children[1]) {
      parentLi.children[1].setAttribute('data-icon', 'caret-down');
    }
  }

  // If this function was invoked from our click event on the mega menu parent, we want to highlight it
  if (megaMenuParentLi && !menuIsOpen) {
    megaMenuParentLi.classList.remove(
      'tw-font-normal',
      'tw-text-neutral-550',
      'hover-tw-text-neutral-700'
    );
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
 * Close mega menu items.
 */
function closeMegaMenu() {
  setActiveColors();
  setActiveMegaMenu();
}

export { setActiveColors, setActiveMegaMenu, closeMegaMenu };

'use strict';

import { closeMegaMenu } from './mega-menu';

/**
 * Create a more Menu at the provided Block ID and navigation class.
 *
 * @param blockId
 *   The Drupal Block HTML ID.
 * @param navClass
 *   The CSS Class applied to the Navigation Menu.
 */
const createMoreMenu = (blockId, navClass) => {
  const menuContainer = document.querySelector('#' + blockId);
  const menuPrimary = document.querySelector('.' + navClass);
  if (menuContainer && menuPrimary) {
    menuContainer.classList.add('--jsfied');
    menuPrimary.insertAdjacentHTML(
      'beforeend',
      `
  <li class="${navClass}-more tw-hidden">
      <button type="button" class="more-button" aria-haspopup="true" aria-expanded="false">
          More <i class="fas fa-fw fa-ellipsis-h"></i>
      </button>
      <ul class="${navClass}-secondary madrone-more-menu">
          ${menuPrimary.innerHTML}
      </ul>
      </button>
  </li>
  `
    );

    const moreButton = menuPrimary.querySelector('.more-button');

    moreButton.addEventListener('click', event => {
      event.preventDefault();
      closeMoreMenu(navClass);
      closeMegaMenu();

      menuContainer.classList.toggle(navClass + '-show-secondary');
      moreButton.setAttribute(
        'aria-expanded',
        menuContainer.classList.contains(navClass + '-show-secondary')
      );
    });
  }
};

const closeMoreMenu = (navClass = '') => {
  const moreMenus = document.querySelectorAll(
    `div[class*='-show-secondary'], nav[class*='-show-secondary']`
  );
  for (let i = 0; i < moreMenus.length; i++) {
    if (!moreMenus[i].classList.contains(navClass + '-show-secondary')) {
      moreMenus[i].querySelector('.more-button').click();
    }
  }
};
/**
 * Adjust more menu to show/hide items when screen resizes.
 *
 * @param blockId
 *  The Drupal Block HTML ID.
 * @param navClass
 *  The CSS Class applied to the Navigation Menu.
 */
const adjustMoreMenu = (blockId, navClass) => {
  const menuContainer = document.querySelector('#' + blockId);
  const menuPrimary = document.querySelector('.' + navClass);
  if (menuContainer && menuPrimary) {
    const menuPrimaryItems = menuContainer.querySelectorAll(
      `.${navClass} > li:not(.${navClass}-more)`
    );

    const allItems = menuContainer.querySelectorAll('li');
    const moreLi = menuPrimary.querySelector('.' + navClass + '-more');
    const moreButton = moreLi.querySelector('button');

    allItems.forEach(item => {
      item.classList.remove('tw-hidden');
    });
    let stopWidth = moreButton.offsetWidth + 45;

    let primaryHiddenItems = [];

    const viewPortWidth = window.innerWidth;
    const titlePlusSearchWidth = 950; // rough width of our logo, site name and search
    const menuSpace = viewPortWidth - titlePlusSearchWidth;

    menuPrimaryItems.forEach((item, i) => {
      if (menuSpace >= stopWidth + item.offsetWidth) {
        stopWidth += item.offsetWidth + 45;
      } else {
        item.classList.add('tw-hidden');
        primaryHiddenItems.push(item.getAttribute('data-index'));
      }
    });

    if (!primaryHiddenItems.length) {
      moreLi.classList.add('tw-hidden');
      menuContainer.classList.remove(navClass + '-show-secondary');
      moreButton.setAttribute('aria-expanded', false);
    } else {
      const menuSecondary = menuContainer.querySelector(
        '.' + navClass + '-secondary'
      );
      const menuSecondaryItems = menuSecondary.querySelectorAll(':scope > li');
      menuSecondaryItems.forEach((item, i) => {
        if (!primaryHiddenItems.includes(item.getAttribute('data-index'))) {
          item.classList.add('tw-hidden');
        }
      });
    }
  }
  const madroneMegaMenuMain = document.getElementsByClassName('madrone-mega-menu-main');
  if (madroneMegaMenuMain.length > 0) {
    madroneMegaMenuMain[0].classList.remove('tw-opacity-0');
    madroneMegaMenuMain[0].classList.remove('tw-absolute');
  }
  const madroneMegaMenuGroup = document.getElementsByClassName('madrone-mega-menu-group');
  if (madroneMegaMenuGroup.length > 0) {
    madroneMegaMenuGroup[0].classList.remove('tw-opacity-0');
    madroneMegaMenuGroup[0].classList.remove('tw-absolute');
  }
};

export { createMoreMenu, adjustMoreMenu, closeMoreMenu };

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
    const moreMenu = menuPrimary.querySelector('.' + navClass + '-secondary');
    moreButton.addEventListener('click', event => {
      event.preventDefault();
      // close all other but this one
      const otherMoreMenus = document.querySelectorAll('.madrone-more-menu-expanded:not(.' + navClass + '-secondary)');
      if (otherMoreMenus.length > 0) {
        for (let i = 0; i < otherMoreMenus.length; i++) {
          otherMoreMenus[i].classList.forEach((className) => {
            if (className.includes('-secondary')) {
              closeMoreMenu(className);
            }
          });
        }
      }
      closeMegaMenu();

      moreMenu.classList.toggle('madrone-more-menu-expanded');
      moreButton.setAttribute(
        'aria-expanded',
        moreMenu.classList.contains('madrone-more-menu-expanded')
      );
    });
  }
}

/**
 * Close a more menu with the provided secondary class name.
 *
 * @param secondaryClass
 *  The More Menus class name, usually mega-menu-secondary.
 */
const closeMoreMenu = (secondaryClass = '') => {
  const openMoreMenu = document.querySelectorAll('.' + secondaryClass + '.madrone-more-menu-expanded');
  for (let i = 0; i < openMoreMenu.length; i++) {
    const openMoreButton = openMoreMenu[i].parentElement.querySelector('.more-button');
    openMoreMenu[i].classList.toggle('madrone-more-menu-expanded');
    openMoreButton.setAttribute('aria-expanded', openMoreMenu[i].classList.contains('madrone-more-menu-expanded'))
  }
}

/**
 * Find any open more menu and close it.
 */
const closeAllMoreMenus = () => {
  document.querySelectorAll('.madrone-more-menu-expanded').forEach((openMoreMenus) => {
    openMoreMenus.classList.forEach((openMoreMenuClass) => {
      if (openMoreMenuClass.includes('-secondary')) {
        closeMoreMenu(openMoreMenuClass);
      }
    });
  });
}

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
}

export { createMoreMenu, adjustMoreMenu, closeMoreMenu, closeAllMoreMenus };

const fontSize = 16;
const smallestEm = 12;
const largestEm = 27;
const DELAY = 250;
let tocJsTimeout = false;
// Wait for the page to finish before looking for the superfish toggles.
window.addEventListener('load', () => {
  const superfishMenus = [...document.querySelectorAll('ul.sf-menu')];
  superfishMenus.map(menu => {
    let menuId = menu.getAttribute('id');
    let menuToggles = document.querySelectorAll(`a#${menuId}-toggle`);
    [...menuToggles].map(menuToggle => {
      menuToggle.addEventListener('click', event => {
        menuClickedText(menuToggle);
      })
    })
  });

  // Check on page load if we need to be a mobile menu.
  if (window.innerWidth <= 768) {
    groupMobileMenu();
    const groupMenu = document.querySelector('#group-content-menu');
    if (groupMenu) {
      groupMenu.classList.add('d-none');
    }

    mobileBreadcrumbs();
  }

  // handle group menu horizontal spacing
  const groupMenus = [...document.querySelectorAll('.block-group-content-menu ul#group-content-menu.menu--level-1 li ul')];
  groupMenus.forEach(menu => {
    resizeMenu(menu);
    if (!menu.classList.contains('menu--level-2')) {
      // move the child element 100% of its width.
      menu.style.left = '100%';
    }
  });

  // this must come after groupMobileMenu() since .menu--level-1 changes there
  const liList = [...document.querySelectorAll('.block-group-content-menu .menu--level-1 li')];
  liList.forEach(li => {
    // if li has child ul element
    if ([...(li.children)].some(e => e.tagName === 'UL')) {
      // add class chevron icon
      li.classList.add('group-sub-menu');
    }
  });

  // Add event listeners only for desktop.
  const desktopMenuLiList = [...document.querySelectorAll('.block-group-content-menu ul#group-content-menu.menu--level-1 li')];
  desktopMenuLiList.forEach(desktopLi => {
    desktopLi.addEventListener('mouseenter', menuItemHoverEvent);
    desktopLi.addEventListener('focusin', menuItemFocusinEvent);
    desktopLi.addEventListener('mouseleave', menuItemMouseLeaveEvent);
    desktopLi.addEventListener('focusout', menuItemMouseLeaveEvent);
  });

  // Add an overflow hidden class to the parent element if the block is inside a column class and has animations.
  const animatedBlocks = [...document.querySelectorAll(".block.aos-init")];
  animatedBlocks.map(block => {
    let blockParent = block.parentElement;
    for (let i = 0; i < blockParent.classList.length; i++) {
      if (/col-.*/.test(blockParent.classList[i])) {
        blockParent.classList.add('overflow-hidden');
        break;
      }
    }
  });

  // ToCJS Width setter.
  const tocJsBlocks = document.querySelectorAll(".toc-js");
  if (tocJsBlocks.length > 0) {
    let tocJsBlock = tocJsBlocks[0];
    let tocJsParentBlock = tocJsBlock.closest('.block[class*="toc-js"]');
    const tocJsParentBlockStyle = window.getComputedStyle(tocJsParentBlock);

    resizeTocJsBlock(tocJsBlock);

    let prevClassState = tocJsBlock.classList.contains('is-sticked');
    // We only care about background, border, and padding.
    let classesToCopy = [...tocJsParentBlockStyle].filter((key) => {
      if (/^border.*/.test(key) || /^background.*/.test(key) || /^padding.*/.test(key)) {
        return key;
      }
    });
    // We loaded the page not at the top, so we need to copy styles down.
    if (prevClassState) {
      classesToCopy.forEach(cssClass => {
        tocJsBlock.style.setProperty(cssClass, tocJsParentBlockStyle.getPropertyValue(cssClass), tocJsParentBlockStyle.getPropertyPriority(cssClass));
      });
      // overwrite background color and border options when loading the page midway.
      tocJsParentBlock.style.setProperty('background-color', 'transparent', 'important');
      tocJsParentBlock.style.setProperty('border', '0', 'important');
    }
    // Create a mutation observer to watch for changes, specifically when the class 'is-sticked' is added/removed.
    let tocJsObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          let currentClassState = mutation.target.classList.contains('is-sticked');
          if (prevClassState !== currentClassState) {
            prevClassState = currentClassState;
          }
          if (prevClassState) {
            classesToCopy.forEach(cssClass => {
              tocJsBlock.style.setProperty(cssClass, tocJsParentBlockStyle.getPropertyValue(cssClass), tocJsParentBlockStyle.getPropertyPriority(cssClass));
            });
            // Set the margin left and to stop the block from jumping and set the background to transparent on the
            // parent block to "hide" it when scrolled.
            tocJsParentBlock.style.setProperty('margin-left', `-${tocJsParentBlockStyle.paddingLeft}`, 'important')
            tocJsParentBlock.style.setProperty('background-color', 'transparent', 'important');
            tocJsParentBlock.style.setProperty('border', '0', 'important');
          } else {
            classesToCopy.forEach(cssClass => {
              tocJsBlock.style.removeProperty(cssClass);
            });
            // Clear all classes we set.
            tocJsParentBlock.style.removeProperty('background-color');
            tocJsParentBlock.style.removeProperty('border');
            tocJsParentBlock.style.removeProperty('margin-left');
          }
        }
      });
    });
    tocJsObserver.observe(tocJsBlock, {attributes: true, childList: false, characterData: false});
  }
});

/**
 * Update text next to menu name to Close when Opened.
 * @param sfToggle
 */
function menuClickedText(sfToggle) {
  if (sfToggle.classList.contains('sf-expanded')) {
    let menuToggleText = sfToggle.textContent;
    sfToggle.textContent = `Close ${menuToggleText}`;
  } else {
    sfToggle.textContent = sfToggle.textContent.replace('Close ', '');
  }
}

/**
 * Create the mobile menu cloning the exiting menu.
 */
function groupMobileMenu() {
  // Create menu top level bucket
  const menus = document.querySelectorAll('ul#group-content-menu');
  menus.forEach((menu) => {
    createMenuBucket(menu);
  });

  const liList = [...document.querySelectorAll('.block-group-content-menu ul#group-content-menu-accordion .menu--level-1 li')];
  liList.forEach(li => {
    // if li has child ul element
    if ([...(li.children)].some(e => e.tagName === 'UL')) {
      cloneLi(li);

      li.children[0].addEventListener('click', menuItemClickEvent);
    }
  });
}

/**
 * Crate the container and inject the cloned menu.
 * @param menu
 */
function createMenuBucket(menu) {
  // Do a deep clone cleaning all extra styles.
  const deepMenuClone = cleanDeepClone(menu);
  // Create new top level ul.
  const topUl = document.createElement('ul');
  topUl.id = 'group-content-menu-accordion';
  topUl.classList = menu.classList;
  topUl.classList.remove('menu--level-1');
  topUl.classList.add('menu--level-0', 'group-mobile-menu');

  const topLi = document.createElement('li');
  topLi.classList = menu.children[0].classList;

  const topA = document.createElement('a');
  topA.classList = menu.children[0].children[0].classList;
  topA.classList.add('group-mobile-main-a');
  topA.innerHTML = 'Menu';

  topLi.appendChild(topA);
  topUl.appendChild(topLi);
  menu.parentNode.insertBefore(topUl, menu);
  // Append the cloned menu so we can target it with hide/show.
  topLi.appendChild(deepMenuClone);

  topA.addEventListener('click', menuItemClickEvent);
}

/**
 * Perform a deep clone and strip all inline styles applied.
 * @param menu
 * @returns Node
 */
function cleanDeepClone(menu) {
  const deepClone = menu.cloneNode(true);
  deepClone.removeAttribute("id");
  const deepCloneSubMenus = deepClone.querySelectorAll('ul');
  deepCloneSubMenus.forEach(deepCloneSubMenu => {
    deepCloneSubMenu.style.left = null;
  })
  return deepClone;
}

/**
 * Events for menu click on desktop.
 * @param event
 */
function menuItemClickEvent(event) {
  // prevent clicks from navigating to the html <a> element.
  event.preventDefault();

  // add styling and change text when clicked
  if (this.parentNode.classList.contains('group-menu-clicked')) {
    this.parentNode.classList.remove('group-menu-clicked');

    this.textContent = this.textContent.replace('Close ', '');
  } else {
    this.parentNode.classList.add('group-menu-clicked');

    const menuToggleText = this.textContent;
    this.textContent = `Close ${menuToggleText}`;
  }
}

/**
 *  Events for menu hover on desktop.
 * @param event
 */
function menuItemHoverEvent(event) {
  if (this.classList.contains('group-menu-hover') && this.mouseLeaveTimeout) {
    // prevent menu from hiding if the mouse leaves only for a moment
    clearTimeout(this.mouseLeaveTimeout);
  } else {
    this.classList.add('group-menu-hover');
  }
}

/**
 * Events for menu hover.
 * @param event
 */
function menuItemFocusinEvent(event) {
  if (!this.classList.contains('group-menu-hover')) {
    this.classList.add('group-menu-hover');
  }
}

/**
 * Event for when the mouse leaves.
 * @param event
 */
function menuItemMouseLeaveEvent(event) {
  const groupMenu = document.querySelectorAll('.block-group-content-menu')[0];
  if (this.classList.contains('group-menu-hover') && !event.currentTarget.contains(event.relatedTarget)) {
    // remove hover immediately if next target is still in the menu
    // otherwise wait a bit
    if (groupMenu.contains(event.relatedTarget)) {
      this.classList.remove('group-menu-hover');
    } else {
      this.mouseLeaveTimeout = setTimeout(() => {
        this.classList.remove('group-menu-hover');
      }, 800);
    }
  }
}

/**
 * Clone li and add to parent a element.
 * @param li
 */
function cloneLi(li) {
  const clonedA = li.children[0].cloneNode(true);
  const clonedLi = document.createElement('li');
  clonedLi.appendChild(clonedA);
  li.children[1].prepend(clonedLi);
}

/**
 * Check it user agent is a mobile agent.
 * @returns {RegExpMatchArray}
 */
function isMobile() {
  return navigator.userAgent.match(/(android|bb\d+|meego)|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i);
}

// Add event listener to browser resize.
window.addEventListener('resize', (event) => {
  const tocJsBlocks = document.querySelectorAll(".toc-js");
  if (tocJsBlocks.length > 0) {
    const tocJsBlock = tocJsBlocks[0];
    clearTimeout(tocJsTimeout);
    tocJsTimeout = setTimeout(resizeTocJsBlock(tocJsBlock), DELAY);
  }
  if (window.innerWidth <= 768) {
    // only add mobile menu if it doesn't already exist.
    let groupMobileId = document.querySelector('#group-content-menu-accordion');
    let groupMenuId = document.querySelector('#group-content-menu');
    if (groupMobileId === null) {
      groupMobileMenu();
      if (groupMenuId) {
        groupMenuId.classList.add('d-none');
      }
    } else {

      groupMenuId.classList.add('d-none');
      groupMobileId.classList.remove('d-none');
      groupMobileId.classList.add('d-flex');
    }

    mobileBreadcrumbs();
  } else {
    // add back desktop menu if mobile menu was added.
    let groupMobileId = document.querySelector('#group-content-menu-accordion');
    let groupMenuId = document.querySelector('#group-content-menu');
    if (groupMobileId !== null) {
      groupMobileId.classList.remove('d-flex');
      groupMobileId.classList.add('d-none');
      groupMenuId.classList.remove('d-none');
      groupMenuId.classList.add('d-flex');
    }

    if (condensedCrumbs) {
      resetBreadCrumbs();
    }
  }
});

/**
 * Resize the Menu provided to the largest item or our LargestEm constant.
 * @param menu
 */
function resizeMenu(menu) {
  menu.style.width = "auto";
  let menuUlMaxLength = 0;
  menu.querySelectorAll('li').forEach(menuLi => {
    menuLi.setAttribute('style', 'white-space:nowrap;');
    let largestItem = Math.ceil(menuLi.clientWidth / fontSize);
    if (largestItem < smallestEm) {
      menuUlMaxLength = smallestEm;
    } else if (largestItem > largestEm) {
      menuUlMaxLength = largestEm;
    } else {
      menuUlMaxLength = largestItem;
    }
    menuLi.setAttribute('style', '');
  });
  menu.style.width = `${menuUlMaxLength}em`;
}

/**
 * Resize the ToCJS block to not overflow when the block switches to position static.
 *
 * @param block
 * @return boolean
 */
function resizeTocJsBlock(block) {
  let closestParentBlock = block.closest('.block[class*="toc-js"]');
  const parentBlockStyle = window.getComputedStyle(closestParentBlock);
  const finalPadding = parseFloat(parentBlockStyle.paddingLeft) + parseFloat(parentBlockStyle.paddingRight);
  const finalMargin = parseFloat(parentBlockStyle.marginLeft) + parseFloat(parentBlockStyle.marginRight);
  const finalWidth = closestParentBlock.clientWidth - finalMargin - finalPadding;
  block.style.width = `${finalWidth}px`;
  return true;
}

// store breadcrumb elements so they can be swapped in and out depending on state
let originalBreadcrumbs;
let breadcrumbs;
let condensedCrumbs;

/**
 * Condense breadcrumbs list when >= 3 pages deep
 */
function mobileBreadcrumbs() {
  if (!breadcrumbs) {
    breadcrumbs = document.querySelector('nav ol.breadcrumb');
    originalBreadcrumbs = breadcrumbs.cloneNode(true);
    truncateCrumbs();
  }
  if (!originalBreadcrumbs) {
    originalBreadcrumbs = breadcrumbs.cloneNode(true);
  }

  const numCrumbs = breadcrumbs.children.length;
  if (numCrumbs >= 3) {
    if (!condensedCrumbs) {
      createCondensedCrumbs(breadcrumbs);
    } else {
      // if originalBreadCrumbs has a parentNode then it is in the DOM, if not breadcrumbs is in DOM
      if (originalBreadcrumbs.parentNode) {
        originalBreadcrumbs.after(condensedCrumbs);
        originalBreadcrumbs.remove();
      } else {
        breadcrumbs.after(condensedCrumbs);
      }
    }

    breadcrumbs.remove();
  }
};

/**
 * Truncates text in breadcrumbs
 *
 * @param {<ol> of breadcrumbs} breadcrumbs
 */
function truncateCrumbs() {
  const TEXT_LIMIT = 30;
  [...breadcrumbs.children].forEach(crumb => {
    if (crumb.children[0] && crumb.children[0].textContent.length > TEXT_LIMIT) {
      crumb.children[0].textContent = `${crumb.children[0].textContent.substring(0, TEXT_LIMIT)}...`;
    } else if (crumb.children.length === 0 && crumb.textContent.trim().length > TEXT_LIMIT) {
      crumb.textContent = `${crumb.textContent.trim().substring(0, TEXT_LIMIT)}...`;
    }
  });
}

/**
 * Creates a <ol> of condensed breadcrumbs to replace original breadcrumbs
 *
 * @param {<ol> of breadcrumbs} breadcrumbs
 */
function createCondensedCrumbs(breadcrumbs) {
  condensedCrumbs = document.createElement('ol');
  condensedCrumbs.classList = ['breadcrumb breadcrumb-condensed'];
  condensedCrumbs.appendChild(breadcrumbs.children[breadcrumbs.children.length - 2].cloneNode(true));

  const expandCrumb = createCrumb('(expand)', breadcrumbs.children[0].classList, expandBreadCrumbs);
  condensedCrumbs.children[0].before(expandCrumb);
  const condenseCrumb = createCrumb('(condense)', [], condenseBreadCrumbs);
  breadcrumbs.appendChild(condenseCrumb);

  breadcrumbs.after(condensedCrumbs)
}

function createCrumb(textContent, classList, onclick) {
  const crumb = document.createElement('li');
  crumb.classList = classList;

  // create <a> tag with onclick event
  crumb.appendChild(document.createElement('a'));
  crumb.children[0].textContent = textContent;
  crumb.children[0].href = '';
  crumb.children[0].onclick = onclick;

  return crumb;
}

/**
 * Hides condensed breadcrumb list and displays regular breadcrumb list
 *
 * @param {event} e click event
 */
function expandBreadCrumbs(e) {
  // not always called from an event
  if (e) {
    e.preventDefault();
  }

  condensedCrumbs.after(breadcrumbs);
  condensedCrumbs.remove();
};

/**
 * Shows condensed breadcrumb list and hides regular breadcrumb list
 *
 * @param {event} e click event
 */
function condenseBreadCrumbs(e) {
  // not always called from an event
  if (e) {
    e.preventDefault();
  }

  breadcrumbs.after(condensedCrumbs);
  breadcrumbs.remove();
};

/**
 * Sets breadcrumbs back to their original settings for desktop view
 */
function resetBreadCrumbs() {
  if (originalBreadcrumbs) {

    condensedCrumbs.after(originalBreadcrumbs);
    condensedCrumbs.remove();
  }
}

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

  // handle group menu horizontal spacing
  if (!isMobile()) {
    const groupMenus = [...document.querySelectorAll('.block-group-content-menu ul li ul')];
    groupMenus.forEach(menu => {
      if (!menu.classList.contains('menu--level-2')) {
        menu.style.left = menu.parentNode.offsetWidth + 'px';
      }
    });
  }

  groupMobileMenu();

  // this must come after groupMobileMenu() since .menu--level-1 changes there
  const liList = [...document.querySelectorAll('#block-groupmenu .menu--level-1 li')];
  liList.forEach(li => {
    // if li has child ul element
    if ([...(li.children)].some(e => e.tagName === 'UL')) {
      // add class chevron icon
      li.classList.add('group-sub-menu');
    }
  });
});

/**
 *  Update text next to menu name to Close when Opened.
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

function groupMobileMenu() {
  if (isMobile()) {
    const menu = document.querySelectorAll('.menu--level-1')[0];

    // Create menu top level bucket
    createMenuBucket(menu);

    const liList = [...document.querySelectorAll('#block-groupmenu .menu--level-1 li')];
    liList.forEach(li => {
      // if li has child ul element
      if ([...(li.children)].some(e => e.tagName === 'UL')) {
        cloneLi(li);

        li.children[0].addEventListener('click', menuItemClickEvent);
      }
    });
  }
}

function createMenuBucket(menu) {
  const topUl = document.createElement('ul');
  topUl.classList = menu.classList;
  topUl.classList.remove('menu--level-1');
  topUl.classList.add('menu--level-0', 'group-mobile-menu');

  const topLi = document.createElement('li');
  topLi.classList = menu.children[0].classList;

  const topA = document.createElement('a');
  topA.classList = menu.children[0].children[0].classList;
  topA.classList.add('group-mobile-main-a');
  topA.innerHTML = 'Group navigation';

  topLi.appendChild(topA);
  topUl.appendChild(topLi);
  menu.parentNode.insertBefore(topUl, menu);
  topLi.appendChild(menu);

  topA.addEventListener('click', menuItemClickEvent);
}

function menuItemClickEvent(event) {
  // prevent clicks from navigating to the a href
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

// clone li and add to child ul element
function cloneLi(li) {
  const clonedA = li.children[0].cloneNode(true);
  const clonedLi = document.createElement('li');
  clonedLi.appendChild(clonedA);
  li.children[1].prepend(clonedLi);
}

function isMobile() {
  return navigator.userAgent.match(/(android|bb\d+|meego)|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i);
}

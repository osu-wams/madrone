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
  const groupMenus = [...document.querySelectorAll('.block-group-content-menu ul .menu--__submenu')];
  // groupMenus.shift();
  groupMenus.forEach(menu => {
    if (!menu.classList.contains('menu--level-2')) {
      menu.addEventListener("mouseenter", function(event) {
        this.style.left = this.parentNode.offsetWidth + 'px';
      });
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



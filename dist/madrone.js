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

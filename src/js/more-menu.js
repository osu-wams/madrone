/**
 *
 * @param blockId
 * @param navClass
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
      <button type="button" aria-haspopup="true" aria-expanded="false">
          More <i class="fas fa-fw fa-ellipsis-h"></i>
      </button>
      <ul class="${navClass}-secondary">
          ${menuPrimary.innerHTML}
      </ul>
      </button>
  </li>
  `
    );

    const moreLi = menuPrimary.querySelector('.' + navClass + '-more');
    const moreButton = moreLi.querySelector('button');

    moreButton.addEventListener('click', event => {
      event.preventDefault();
      menuContainer.classList.toggle(navClass + '-show-secondary');
      moreButton.setAttribute(
        'aria-expanded',
        menuContainer.classList.contains(navClass + '-show-secondary')
      );
    });
  }
};
/**
 *
 * @param blockId
 * @param navClass
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
    const primaryWidth = menuPrimary.offsetWidth - stopWidth;
    menuPrimary.style.width = primaryWidth;
    menuPrimaryItems.forEach((item, i) => {
      if (primaryWidth >= stopWidth + item.offsetWidth) {
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
        item.classList.remove('tw-whitespace-nowrap'); // "more menu" items should wrap to multiple lines if needed
        if (!primaryHiddenItems.includes(item.getAttribute('data-index'))) {
          item.classList.add('tw-hidden');
        }
      });
    }
  }
};

export {createMoreMenu, adjustMoreMenu};

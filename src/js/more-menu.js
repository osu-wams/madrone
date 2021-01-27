const menuContainer = document.querySelector('#block-madrone-main-menu');
const menuPrimary = document.querySelector('.madrone-mega-menu-main');
const menuPrimaryItems = menuContainer.querySelectorAll(
  '.madrone-mega-menu-main > li:not(.madrone-mega-menu-main-more)'
);

const createMoreMenu = () => {
  // menuPrimaryItems.forEach((item, index) => {
  //   item.setAttribute('data-index', index);
  // });
  menuContainer.classList.add('--jsfield');
  // menuPrimary.insertAdjacentHTML(
  //   'beforeend',
  //   `
  // <li class="madrone-mega-menu-main-more tw-hidden">
  //     <button type="button" aria-haspopup="true" aria-expanded="false">
  //         More <i class="fas fa-fw fa-ellipsis-h"></i>
  //     </button>
  //     <ul class="madrone-mega-menu-main-secondary">
  //         ${menuPrimary.innerHTML}
  //     </ul>
  //     </button>
  // </li>
  // `
  // );

  const moreLi = menuPrimary.querySelector('.madrone-mega-menu-main-more');
  const moreButton = moreLi.querySelector('button');

  moreButton.addEventListener('click', event => {
    event.preventDefault();
    menuContainer.classList.toggle('madrone-mega-menu-main-show-secondary');
    moreButton.setAttribute(
      'aria-expanded',
      menuContainer.classList.contains('madrone-mega-menu-main-show-secondary')
    );
  });
};

const adjustMoreMenu = () => {
  const allItems = menuContainer.querySelectorAll('li');
  const moreLi = menuPrimary.querySelector('.madrone-mega-menu-main-more');
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
    menuContainer.classList.remove('madrone-mega-menu-main-show-secondary');
    moreButton.setAttribute('aria-expanded', false);
  } else {
    const menuSecondary = menuContainer.querySelector(
      '.madrone-mega-menu-main-secondary'
    );
    const menuSecondaryItems = menuSecondary.querySelectorAll(':scope > li');
    menuSecondaryItems.forEach((item, i) => {
      item.classList.remove('tw-whitespace-nowrap'); // "more menu" items should wrap to multiple lines if needed
      if (!primaryHiddenItems.includes(item.getAttribute('data-index'))) {
        item.classList.add('tw-hidden');
      }
    });
  }
};

export { createMoreMenu, adjustMoreMenu };

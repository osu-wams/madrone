/**
 * Add Event Listeners to the Main navigation level 0.
 * @type {HTMLCollectionOf<Element>}
 */
let megaMenuParent = document.getElementsByClassName('mega-menu-parent');
for (i = 0; i < megaMenuParent.length; i++) {
  megaMenuParent[i].addEventListener('click', e => {
    let megaMenuParentLi = e.target.closest("li");
    // Remove any active menu items
    let headerHeight = document
      .getElementsByTagName('header')[0]
      .getBoundingClientRect().bottom;
    let childMenuItem = megaMenuParentLi.getElementsByClassName(
      'mega-menu'
    );
    let megaMenuExists = childMenuItem.length > 0;
    if (megaMenuExists) {
      let megaMenuDiv = childMenuItem[0];
      let megaMenuIsOpen = megaMenuDiv.classList.contains('lg-tw-grid');
      megaMenuDiv.style.top = (headerHeight + 5) / 16 + 'rem';
      setActiveColors(megaMenuParentLi, megaMenuIsOpen);
      setActiveMegaMenu(megaMenuDiv, megaMenuIsOpen);
    }
  });
}

function setActiveMegaMenu(arg1 = null, arg2 = null) {
  let openMegaMenus = document.getElementsByClassName('mega-menu');
  for (i = 0; i < openMegaMenus.length; i++) {
    openMegaMenus[i]?.classList.remove('lg-tw-grid');
  }
  if (arg2) {
    // mega menu currently open and is going to close
  } else if (arg1 != null) {
    arg1.classList.add('lg-tw-grid');
  }
}

function setActiveColors(arg1 = null, arg2 = null) {
  // arg1 == e.target.parentElement | <li>
  // arg2 == megaMenuIsOpen | bool
  let openMegaMenuParents = document.getElementsByClassName('mega-menu-parent');
  // resets color on all non active mega menu parent items
  for (i = 0; i < openMegaMenuParents.length; i++) {
    // openMegaMenuParents[i].parentElement.classList.remove('tw-border-bot-custom')
    openMegaMenuParents[i].parentElement.classList.remove('tw-border-osuorange')
    openMegaMenuParents[i].parentElement.classList.remove('tw-text-osuorange', 'hover-tw-text-osuorange');
    openMegaMenuParents[i].parentElement.classList.add('tw-font-normal', 'tw-text-neutral-550', 'hover-tw-text-neutral-700');
    // console.log(openMegaMenuParents[i].parentElement.children[1])
    if (openMegaMenuParents[i].parentElement.children[1]) {
      openMegaMenuParents[i].parentElement.children[1].setAttribute('data-icon', 'caret-down')
    }
  }
  if (arg2) {
    // mega menu currently open and is going to close | don't highlight selection
  } else if (arg1 != null) {
    arg1.classList.remove(
      'tw-font-normal',
      'tw-text-neutral-550',
      'hover-tw-text-neutral-700',
    );
    arg1.classList.add(
      'tw-text-osuorange',
      'hover-tw-text-osuorange',
    );
    arg1.getElementsByClassName('mega-menu-parent')[0].parentElement.classList.add('tw-border-osuorange')
    // console.log(arg1.children[1])

    // console.log(arg1.querySelector('[data-icon="caret-down"]'))

    arg1.children[1].setAttribute('data-icon', 'caret-up')
    // arg1.children[1].
  }
}

/**
 * Modal for OSU Menu
 */
var openmodal = document.querySelectorAll('.modal-open');
for (var i = 0; i < openmodal.length; i++) {
  openmodal[i].addEventListener('click', function (event) {
    event.preventDefault();
    toggleModal();
  });
}

const overlay = document.querySelector('.modal-overlay');
overlay.addEventListener('click', toggleModal);

var closemodal = document.querySelectorAll('.modal-close');
for (var i = 0; i < closemodal.length; i++) {
  closemodal[i].addEventListener('click', toggleModal);
}
/**
 * Add an event listener on the whole window for escape and close the Mega Menu and toggle to modal if open.
 */
document.addEventListener('keydown', e => {
  // keyCode is deprecated but left in for legacy browsers.
  var key = e.key || e.keyCode;
  if (key === 'Escape' || key === 'Esc' || key === 27) {
    closeMegaMenu();
    if (document.body.classList.contains('modal-active')) {
      toggleModal();
    }
  }
});

function toggleModal() {
  const body = document.querySelector('body');
  const main = document.getElementById('main-container');
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.modal-overlay');
  overlay.classList.toggle('tw-hidden');
  modal.classList.toggle('tw-hidden');
  body.classList.toggle('modal-active');
  main.classList.toggle('tw-pointer-events-none');
}

/**
 * Close mega menu items.
 */
function closeMegaMenu() {
  setActiveColors();
  setActiveMegaMenu();
}

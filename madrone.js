window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMegaMenu();
  }
});

let megaMenuParent = document.getElementsByClassName('mega-menu-parent');
for (i = 0; i < megaMenuParent.length; i++) {
  megaMenuParent[i].addEventListener('click', (e) => {
    // Remove any active menu items
    // Close any open menu items.
    closeMegaMenu();
    let headerHeight = document.getElementsByTagName("header")[0].getBoundingClientRect().bottom;
    // If the parent is active ignore the class swap.
    if (!e.target.parentElement.classList.contains('is-active')) {
      if (e.target.parentElement.classList.contains('tw-font-normal')) {
        e.target.parentElement.classList.remove('tw-font-normal', 'tw-text-neutral-550', 'hover-tw-text-neutral-700');
        e.target.parentElement.classList.add('tw-text-osuorange', 'tw-font-bold', 'hover-tw-text-osuorange');
      } else {
        e.target.parentElement.classList.remove('tw-text-osuorange', 'tw-font-bold', 'hover-tw-text-osuorange');
        e.target.parentElement.classList.add('tw-font-normal', 'tw-text-neutral-550', 'hover-tw-text-neutral-700');
      }
    }
    let childMenuItem = e.target.parentElement.getElementsByClassName('mega-menu');
    if (childMenuItem.length > 0) {
      childMenuItem[0].style.top = (headerHeight + 5) / 16 + 'rem';
      childMenuItem[0].classList.toggle('lg-tw-flex');
    }
  })
}

/**
 * Toggle the OSU Menu open and close.
 */
function toggleOSUMenu() {
  let headerHeight = document.getElementsByTagName("header")[0].getBoundingClientRect().height;
  osuMenu = document.getElementById('osu-menu');
  mainBody = document.getElementById('main-container');
  closeButton = document.getElementById('osu-menu-close');
  openButton = document.getElementById('osu-menu-beno');
  osuMenu.style.top = headerHeight / 16 + 'rem';
  osuMenu.classList.toggle('tw-hidden');
  mainBody.classList.toggle('tw-bg-black');
  mainBody.classList.toggle('tw-bg-opacity-25');
  closeButton.classList.toggle('tw-hidden');
  openButton.classList.toggle('tw-hidden');
}

function closeMegaMenu() {
  let openMegaMenus = document.getElementsByClassName('mega-menu');
  for (i = 0; i < openMegaMenus.length; i++) {
    openMegaMenus[i]?.classList.remove('lg-tw-flex');
  }
  let openMegaMenuParents = document.getElementsByClassName('mega-menu-parent');
  for (i = 0; i < openMegaMenuParents.length; i++) {
    if (!openMegaMenuParents[i].classList.contains('is-active')) {
      openMegaMenuParents[i].classList.remove('tw-text-osuorange', 'tw-font-bold', 'hover-tw-text-osuorange');
      openMegaMenuParents[i].classList.add('tw-font-normal', 'tw-text-neutral-550', 'hover-tw-text-neutral-700');
    }
  }
}

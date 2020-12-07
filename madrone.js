let megaMenuParent = document.getElementsByClassName('mega-menu-parent');

for (i = 0; i < megaMenuParent.length; i++) {
  megaMenuParent[i].addEventListener('click', (e) => {
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
      if (childMenuItem[0].classList.contains('lg-tw-flex')) {
        childMenuItem[0].classList.remove('lg-tw-flex');
      } else {
        childMenuItem[0].style.top = (headerHeight + 5) / 16 + 'rem';
        childMenuItem[0].classList.add('lg-tw-flex');
      }
    }
  })
}


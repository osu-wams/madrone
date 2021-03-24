/**
 * Adds a modal with opacity around the whole site
 * Currently used for the home left menu "OSU Menu"
 */
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

function toggleNavModal() {
  closeMobileGroupMenuDropdown();
  const navModal = document.querySelector('.nav-modal');
  navModal.classList.toggle('tw-hidden');
  if (navModal.classList.contains('tw-hidden')) {
    closeNavModal();
  } else {
    openNavModal();
  }
}

function toggleMobileNavAccordion(ele) {
  const parentId = ele.currentTarget.id;
  const container = document.querySelector('#mobile-header-ul')
  const rowsToToggle = container.querySelectorAll(`[data-pid=${CSS.escape(parentId)}]`);
  for (let i = 0; i < rowsToToggle.length; i++) {
    rowsToToggle[i].classList.toggle('tw-hidden');
    const liSvgs = ele.currentTarget.getElementsByTagName('svg');
    const chevron = liSvgs[liSvgs.length - 1];
    if (rowsToToggle[i].classList.contains('tw-hidden')) {
      chevron.setAttribute('data-icon', 'chevron-down');
    } else {
      chevron.setAttribute('data-icon', 'chevron-up');
    }
  }
}

function toggleMobileGroupMenuAccordion(ele) {
  const parentId = ele.currentTarget.id;
  const container = document.querySelector('#mobile-secondary-menu-div');
  const rowsToToggle = container.querySelectorAll(`[data-pid=${CSS.escape(parentId)}]`);
  for (let i = 0; i < rowsToToggle.length; i++) {
    rowsToToggle[i].classList.toggle('tw-hidden');
    const liSvgs = ele.currentTarget.getElementsByTagName('svg');
    const chevron = liSvgs[liSvgs.length - 1];
    if (rowsToToggle[i].classList.contains('tw-hidden')) {
      chevron.setAttribute('data-icon', 'chevron-down');
    } else {
      chevron.setAttribute('data-icon', 'chevron-up');
    }
  }
}

function toggleMobileGroupMenu() {
  const mobileGroupMenuDiv = document.querySelector('#mobile-secondary-menu-div');
  mobileGroupMenuDiv.classList.toggle('tw-hidden');
  setMobileGroupMenuIcon();
}

function closeMobileGroupMenuDropdown() {
  const mobileGroupMenuDiv = document.querySelector('#mobile-secondary-menu-div');
  if (mobileGroupMenuDiv != null) {
    mobileGroupMenuDiv.classList.add('tw-hidden');
    setMobileGroupMenuIcon();
  }
}

function openMobileGroupMenuDropdown() {
  const mobileGroupMenuDiv = document.querySelector('#mobile-secondary-menu-div');
  mobileGroupMenuDiv.classList.remove('tw-hidden');
  setMobileGroupMenuIcon();
}

function setMobileGroupMenuIcon() {
  const mobileGroupMenuDiv = document.querySelector('#mobile-secondary-menu-div');
  const mobileGroupMenuDropdown = document.querySelector('.madrone-mobile-group-menu-dropdown');
  const svg = mobileGroupMenuDropdown.getElementsByTagName('svg');
  if (svg.length > 0) {
    if (mobileGroupMenuDiv.classList.contains('tw-hidden')) {
      svg[0].setAttribute('data-icon', 'chevron-down');
    } else {
      svg[0].setAttribute('data-icon', 'chevron-up');
    }
  }
}

function closeNavModal() {
  const navModal = document.querySelector('.nav-modal');
  const menuButton = document.querySelector('.modal-nav-open');
  // I'm heavily relying on the order of the children not changing. We may want to consider using ID or Class
  const menuButtonIcon = menuButton.children[0];
  const menuButtonText = menuButton.children[1];
  navModal.classList.add('tw-hidden');
  menuButtonIcon.setAttribute('data-icon', 'bars');
  menuButtonText.innerText = 'Menu';
}

function openNavModal() {
  const navModal = document.querySelector('.nav-modal');
  const menuButton = document.querySelector('.modal-nav-open');
  // I'm heavily relying on the order of the children not changing. We may want to consider using ID or Class
  const menuButtonIcon = menuButton.children[0];
  const menuButtonText = menuButton.children[1];
  navModal.classList.remove('tw-hidden');
  menuButtonIcon.setAttribute('data-icon', 'times');
  menuButtonText.innerText = 'Close';
}

/**
 * Modal for OSU Menu
 */
function modalSetup() {
  const openmodal = document.querySelectorAll('.modal-open');
  for (let i = 0; i < openmodal.length; i++) {
    openmodal[i].addEventListener('click', function (event) {
      event.preventDefault();
      toggleModal();
      closeNavModal();
      closeMobileGroupMenuDropdown();
    });
  }
  const overlay = document.querySelector('.modal-overlay');
  overlay.addEventListener('click', toggleModal);
  var closemodal = document.querySelectorAll('.modal-close');
  for (let i = 0; i < closemodal.length; i++) {
    closemodal[i].addEventListener('click', toggleModal);
  }
  // Modal for navigation menu
  const openMobileNavMenu = document.querySelectorAll('.modal-nav-open');
  for (let i = 0; i < openMobileNavMenu.length; i++) {
    openMobileNavMenu[i].addEventListener('click', toggleNavModal);
  }
  const allMobileNavParentLi = document.querySelectorAll('.mobile-nav-li-1');
  for (let i = 0; i < allMobileNavParentLi.length; i++) {
    allMobileNavParentLi[i].addEventListener('click', toggleMobileNavAccordion);
  }
  const allMobileGroupMenuParentLi = document.querySelectorAll('.mobile-secondary-menu-li-0');
  for (let i = 0; i < allMobileGroupMenuParentLi.length; i++) {
    allMobileGroupMenuParentLi[i].addEventListener('click', toggleMobileGroupMenuAccordion);
  }
  const mobileGroupMenuDiv = document.querySelector('.madrone-mobile-group-menu-dropdown');
  if (mobileGroupMenuDiv != null) {
    console.log("we in there");
    mobileGroupMenuDiv.addEventListener('click', toggleMobileGroupMenu);
  }
}

export { toggleModal, modalSetup, closeNavModal, closeMobileGroupMenuDropdown };

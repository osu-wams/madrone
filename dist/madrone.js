/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mega-menu.js":
/*!*****************************!*\
  !*** ./src/js/mega-menu.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setActiveColors": () => /* binding */ setActiveColors,
/* harmony export */   "setActiveMegaMenu": () => /* binding */ setActiveMegaMenu,
/* harmony export */   "closeMegaMenu": () => /* binding */ closeMegaMenu,
/* harmony export */   "megaMenuToggle": () => /* binding */ megaMenuToggle
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");

/**
 * Hides all the mega menus. Will then add lg-tw-grid to megaMenuDiv if menuIsOpen is true and megaMenuDiv is not null
 */

function setActiveMegaMenu() {
  var megaMenuDiv = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var menuIsOpen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var openMegaMenus = document.getElementsByClassName('madrone-mega-menu-container lg-tw-grid');

  if (openMegaMenus) {
    for (var i = 0; i < openMegaMenus.length; i++) {
      openMegaMenus[i].classList.remove('lg-tw-grid');
    }
  }

  if (megaMenuDiv && !menuIsOpen) {
    megaMenuDiv.classList.add('lg-tw-grid');
  }
}
/**
 * Resets all the colors on the mega menu parents. If the mega menu is being opened, will change the color of the
 * corresponding mega menu parent item to orange. Also flips the cheveron.
 */


function setActiveColors() {
  var megaMenuParentLi = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var menuIsOpen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // megaMenuParentLi == e.target.parentElement | <li>
  // menuIsOpen == megaMenuIsOpen | bool
  var openMegaMenuParents = document.getElementsByClassName('mega-menu-parent'); // resets color on all non active mega menu parent items

  for (var i = 0; i < openMegaMenuParents.length; i++) {
    var parentLi = openMegaMenuParents[i].parentElement;
    parentLi.classList.remove('tw-text-osuorange', 'madrone-active-trail', 'hover-tw-text-osuorange');
    parentLi.classList.add('tw-font-normal', 'tw-text-neutral-550'); // Checks to see if there is a chevron. If so, reset it to down

    if (parentLi.children[1]) {
      parentLi.children[1].setAttribute('data-icon', 'caret-down');
    }
  } // If this function was invoked from our click event on the mega menu parent, we want to highlight it


  if (megaMenuParentLi && !menuIsOpen) {
    megaMenuParentLi.classList.remove('tw-font-normal', 'tw-text-neutral-550');
    megaMenuParentLi.classList.add('tw-text-osuorange', 'hover-tw-text-osuorange'); // Sets a orange border on the mega menu parent LI that was selected

    megaMenuParentLi.getElementsByClassName('mega-menu-parent')[0].parentElement.classList.add('madrone-active-trail');
    megaMenuParentLi.children[1].setAttribute('data-icon', 'caret-up');
  }
}
/**
 * Add click events to all link items with mega menus
 */


function megaMenuToggle() {
  var megaMenuParent = document.getElementsByClassName('mega-menu-parent'); // Adds event listener to close MegaMenu

  var closeButton = document.querySelectorAll('.closeMegaMenu');

  if (closeButton) {
    for (var i = 0; i < closeButton.length; i++) {
      closeButton[i].addEventListener('click', closeMegaMenu);
    }
  }
  /**
   * Adds click event that toggles the Mega Menu to mega menu parent items
   */


  for (var _i = 0; _i < megaMenuParent.length; _i++) {
    megaMenuParent[_i].addEventListener('click', function (e) {
      var megaMenuParentLi = e.target.closest('li'); // Gets all the child pages

      var megaMenus = megaMenuParentLi.getElementsByClassName('madrone-mega-menu-container');
      var megaMenuExists = megaMenus.length > 0;
      /**
       * Checks to see if a mega menu should exist. If so, we determine if we are opening/closing the
       * menu and pass that information into the functions that handle it.
       */

      if (megaMenuExists) {
        var megaMenuDiv = megaMenus[0];
        var megaMenuIsOpen = megaMenuDiv.classList.contains('lg-tw-grid'); // This needs to be calculated here, calculating it outside causes problems when logged in with admin toolbar

        var bottomHeader = document.querySelector('[role=banner]').getBoundingClientRect().bottom;
        megaMenuDiv.style.top = bottomHeader + 'px';
        setActiveColors(megaMenuParentLi, megaMenuIsOpen);
        setActiveMegaMenu(megaMenuDiv, megaMenuIsOpen);
      }
    }); // Spans can now be clicked with keyboard and spacebar


    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.actAsButton)(megaMenuParent[_i]);
  }
}
/**
 * Close mega menu items.
 */


function closeMegaMenu() {
  setActiveColors();
  setActiveMegaMenu();
}



/***/ }),

/***/ "./src/js/modal.js":
/*!*************************!*\
  !*** ./src/js/modal.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toggleModal": () => /* binding */ toggleModal,
/* harmony export */   "modalSetup": () => /* binding */ modalSetup,
/* harmony export */   "toggleNavModal": () => /* binding */ toggleNavModal,
/* harmony export */   "closeNavModal": () => /* binding */ closeNavModal,
/* harmony export */   "openNavModal": () => /* binding */ openNavModal
/* harmony export */ });
/**
 * Adds a modal with opacity around the whole site
 * Currently used for the home left menu "OSU Menu"
 */
function toggleModal() {
  var body = document.querySelector('body');
  var main = document.getElementById('main-container');
  var modal = document.querySelector('.modal');
  var overlay = document.querySelector('.modal-overlay');
  overlay.classList.toggle('tw-hidden');
  modal.classList.toggle('tw-hidden');
  body.classList.toggle('modal-active');
  main.classList.toggle('tw-pointer-events-none');
}

function toggleNavModal() {
  var navModal = document.querySelector('.navModal');
  navModal.classList.toggle('tw-hidden');

  if (navModal.classList.contains('tw-hidden')) {
    closeNavModal();
  } else {
    openNavModal();
  }
}

function closeNavModal() {
  var navModal = document.querySelector('.navModal');
  var menuButton = document.querySelector('.modal-nav-open'); // I'm heavily relying on the order of the children not changing. We may want to consider using ID or Class

  var menuButtonIcon = menuButton.children[0];
  var menuButtonText = menuButton.children[1];
  navModal.classList.add('tw-hidden');
  menuButtonIcon.setAttribute('data-icon', 'bars');
  menuButtonText.innerText = 'Menu';
}

function openNavModal() {
  var navModal = document.querySelector('.navModal');
  var menuButton = document.querySelector('.modal-nav-open'); // I'm heavily relying on the order of the children not changing. We may want to consider using ID or Class

  var menuButtonIcon = menuButton.children[0];
  var menuButtonText = menuButton.children[1];
  navModal.classList.remove('tw-hidden');
  menuButtonIcon.setAttribute('data-icon', 'times');
  menuButtonText.innerText = 'Close';
}
/**
 * Modal for OSU Menu
 */


function modalSetup() {
  var openmodal = document.querySelectorAll('.modal-open');

  for (var i = 0; i < openmodal.length; i++) {
    openmodal[i].addEventListener('click', function (event) {
      event.preventDefault();
      toggleModal();
    });
  }

  var overlay = document.querySelector('.modal-overlay');
  overlay.addEventListener('click', toggleModal);
  var closemodal = document.querySelectorAll('.modal-close');

  for (var _i = 0; _i < closemodal.length; _i++) {
    closemodal[_i].addEventListener('click', toggleModal);
  } // Modal for navigation menu


  var openMobileNavMenu = document.querySelectorAll('.modal-nav-open');

  for (var _i2 = 0; _i2 < openMobileNavMenu.length; _i2++) {
    openMobileNavMenu[_i2].addEventListener('click', toggleNavModal);
  } // copying the search into the menu


  var searchBlockForm = document.getElementById('block-madrone-search');
  var mobileNavSearch = document.getElementById('mobile-nav-search');
  mobileNavSearch.innerHTML = searchBlockForm.innerHTML;
}



/***/ }),

/***/ "./src/js/more-menu.js":
/*!*****************************!*\
  !*** ./src/js/more-menu.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createMoreMenu": () => /* binding */ createMoreMenu,
/* harmony export */   "adjustMoreMenu": () => /* binding */ adjustMoreMenu,
/* harmony export */   "closeMoreMenu": () => /* binding */ closeMoreMenu
/* harmony export */ });
/* harmony import */ var _mega_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mega-menu */ "./src/js/mega-menu.js");



/**
 * Create a more Menu at the provided Block ID and navigation class.
 *
 * @param blockId
 *   The Drupal Block HTML ID.
 * @param navClass
 *   The CSS Class applied to the Navigation Menu.
 */

var createMoreMenu = function createMoreMenu(blockId, navClass) {
  var menuContainer = document.querySelector('#' + blockId);
  var menuPrimary = document.querySelector('.' + navClass);

  if (menuContainer && menuPrimary) {
    menuContainer.classList.add('--jsfied');
    menuPrimary.insertAdjacentHTML('beforeend', "\n  <li class=\"".concat(navClass, "-more tw-hidden\">\n      <button type=\"button\" class=\"more-button\" aria-haspopup=\"true\" aria-expanded=\"false\">\n          More <i class=\"fas fa-fw fa-ellipsis-h\"></i>\n      </button>\n      <ul class=\"").concat(navClass, "-secondary madrone-more-menu\">\n          ").concat(menuPrimary.innerHTML, "\n      </ul>\n      </button>\n  </li>\n  "));
    var moreButton = menuPrimary.querySelector('.more-button');
    moreButton.addEventListener('click', function (event) {
      event.preventDefault();
      closeMoreMenu(navClass);
      (0,_mega_menu__WEBPACK_IMPORTED_MODULE_0__.closeMegaMenu)();
      menuContainer.classList.toggle(navClass + '-show-secondary');
      moreButton.setAttribute('aria-expanded', menuContainer.classList.contains(navClass + '-show-secondary'));
    });
  }
};

var closeMoreMenu = function closeMoreMenu() {
  var navClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var moreMenus = document.querySelectorAll("div[class*='-show-secondary'], nav[class*='-show-secondary']");

  for (var i = 0; i < moreMenus.length; i++) {
    if (!moreMenus[i].classList.contains(navClass + '-show-secondary')) {
      moreMenus[i].querySelector('.more-button').click();
    }
  }
};
/**
 * Adjust more menu to show/hide items when screen resizes.
 *
 * @param blockId
 *  The Drupal Block HTML ID.
 * @param navClass
 *  The CSS Class applied to the Navigation Menu.
 */


var adjustMoreMenu = function adjustMoreMenu(blockId, navClass) {
  var menuContainer = document.querySelector('#' + blockId);
  var menuPrimary = document.querySelector('.' + navClass);

  if (menuContainer && menuPrimary) {
    var menuPrimaryItems = menuContainer.querySelectorAll(".".concat(navClass, " > li:not(.").concat(navClass, "-more)"));
    var allItems = menuContainer.querySelectorAll('li');
    var moreLi = menuPrimary.querySelector('.' + navClass + '-more');
    var moreButton = moreLi.querySelector('button');
    allItems.forEach(function (item) {
      item.classList.remove('tw-hidden');
    });
    var stopWidth = moreButton.offsetWidth + 45;
    var primaryHiddenItems = [];
    var viewPortWidth = window.innerWidth;
    var titlePlusSearchWidth = 950; // rough width of our logo, site name and search

    var menuSpace = viewPortWidth - titlePlusSearchWidth;
    menuPrimaryItems.forEach(function (item, i) {
      if (menuSpace >= stopWidth + item.offsetWidth) {
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
      var menuSecondary = menuContainer.querySelector('.' + navClass + '-secondary');
      var menuSecondaryItems = menuSecondary.querySelectorAll(':scope > li');
      menuSecondaryItems.forEach(function (item, i) {
        if (!primaryHiddenItems.includes(item.getAttribute('data-index'))) {
          item.classList.add('tw-hidden');
        }
      });
    }
  }
};



/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "actAsButton": () => /* binding */ actAsButton
/* harmony export */ });
/**
 * When we have a span or a div that we need it to act like a button
 * for accessibility problems, we can use this function.
 * @param {*} element the element we want to trigger a click for
 */
function actAsButton(element) {
  element.addEventListener('keydown', function (e) {
    // The codes represent Enter/Return(13) and Spacebar(32)
    var code = e.charCode || e.keyCode;

    if (code === 32 || code === 13) {
      e.preventDefault();
      element.click();
    } else {
      return false;
    }
  });
}



/***/ }),

/***/ "./src/madrone.js":
/*!************************!*\
  !*** ./src/madrone.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_more_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/more-menu */ "./src/js/more-menu.js");
/* harmony import */ var _js_mega_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/mega-menu */ "./src/js/mega-menu.js");
/* harmony import */ var _js_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/modal */ "./src/js/modal.js");



/**
 * Add Event Listeners to the Main navigation level 0.
 * @type {HTMLCollectionOf<Element>}
 */

(0,_js_modal__WEBPACK_IMPORTED_MODULE_2__.modalSetup)();
(0,_js_more_menu__WEBPACK_IMPORTED_MODULE_0__.createMoreMenu)('block-madrone-main-menu', 'madrone-mega-menu-main');
(0,_js_more_menu__WEBPACK_IMPORTED_MODULE_0__.createMoreMenu)('block-madrone-groupmenu', 'madrone-mega-menu-group');
(0,_js_mega_menu__WEBPACK_IMPORTED_MODULE_1__.megaMenuToggle)(); // Adapt immediately on load.

window.addEventListener('load', function () {
  (0,_js_more_menu__WEBPACK_IMPORTED_MODULE_0__.adjustMoreMenu)('block-madrone-main-menu', 'madrone-mega-menu-main');
  (0,_js_more_menu__WEBPACK_IMPORTED_MODULE_0__.adjustMoreMenu)('block-madrone-groupmenu', 'madrone-mega-menu-group');
}); // Adapt on window resize.

window.addEventListener('resize', function () {
  (0,_js_more_menu__WEBPACK_IMPORTED_MODULE_0__.adjustMoreMenu)('block-madrone-main-menu', 'madrone-mega-menu-main');
  (0,_js_more_menu__WEBPACK_IMPORTED_MODULE_0__.adjustMoreMenu)('block-madrone-groupmenu', 'madrone-mega-menu-group');
});
/**
 * Add an event listener on the whole window for escape and close the Mega Menu and toggle to modal if open.
 */

document.addEventListener('keyup', function (e) {
  // keyCode is deprecated but left in for legacy browsers.
  var key = e.key || e.keyCode;

  if (key === 'Escape' || key === 'Esc' || key === 27) {
    (0,_js_mega_menu__WEBPACK_IMPORTED_MODULE_1__.closeMegaMenu)();

    if (document.body.classList.contains('modal-active')) {
      (0,_js_modal__WEBPACK_IMPORTED_MODULE_2__.toggleModal)();
    }

    (0,_js_more_menu__WEBPACK_IMPORTED_MODULE_0__.closeMoreMenu)();
    (0,_js_modal__WEBPACK_IMPORTED_MODULE_2__.closeNavModal)();
  }
});
/**
 * Closes more menus whenever there is a click anywhere
 * Except something that toggles the mega menu, and the more button itself
 */

document.addEventListener('click', function (e) {
  if (e.target && !e.target.classList.contains('more-button') && !e.target.parentElement.classList.contains('more-button') && !e.target.parentElement.classList.contains('mega-menu-parent') && !e.target.classList.contains('mega-menu-parent') && !e.target.classList.contains('fa-ellipsis-h') && !e.target.parentElement.classList.contains('fa-ellipsis-h')) {
    (0,_js_more_menu__WEBPACK_IMPORTED_MODULE_0__.closeMoreMenu)();
  }
});

/***/ }),

/***/ "./src/madrone.css":
/*!*************************!*\
  !*** ./src/madrone.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {}
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/dist/madrone": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./src/madrone.js"],
/******/ 			["./src/madrone.css"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	return __webpack_require__.x();
/******/ })()
;
/**
 * When we have a span or a div that we need it to act like a button
 * for accessibility problems, we can use this function.
 * @param {*} element the element we want to trigger a click for
 */
function actAsButton(element) {
  element.addEventListener('keydown', e => {
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

export { actAsButton };

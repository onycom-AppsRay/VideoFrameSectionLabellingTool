/**
 * @param {*} element, "video-files" document
 */
const initialize = (element) => {
  while(element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}

export default {
  initialize,
}

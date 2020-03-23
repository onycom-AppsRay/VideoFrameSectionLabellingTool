/**
 * @param {*} element, "video-files" document
 */
const initialize = (element) => {
  while(element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}

const createNameTag = (className, name, data) => {
  const span = document.createElement("span");
  span.setAttribute("class", className);
  span.setAttribute("data-info", data);
  span.innerHTML = name;

  return span;
}

export default {
  initialize,
  createNameTag
}

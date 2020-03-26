const initialize = (element) => {
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}

const createNameTag = (tagName, className, classId, datasetPath, datasetTitle, innerText) => {
  const element = document.createElement(tagName);

  element.className = className;
  element.id = classId;
  element.dataset.path = datasetPath;
  element.dataset.title = datasetTitle;
  element.textContent = innerText;
  element.style.wordBreak = "keep-all";

  return element;
}

const addEvent = (element, eventName, eventMethod, propagation = false) => {
  element.addEventListener(eventName, (event) => {
    eventMethod(event.target);
  }, propagation);
}

export default {
  initialize,
  createNameTag,
  addEvent
}

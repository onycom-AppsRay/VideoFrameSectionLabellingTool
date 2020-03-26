
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

const getTitlesOfVideoTags = (containerElement) => {
  if(!containerElement.hasChildNodes()) {
    return;
  }

  const childTagList = containerElement.children;

  let result = [];;

  for (let i = 0; i < childTagList.length; i++) {
    const childTag = childTagList.item(i);
    const childTagContent = childTag.innerHTML;

    if (childTagContent != "" && childTagContent.match(/\.(mp4|mov)$/) != null) {
      result.push(childTagContent);
    }
  }

  return result;
}

export default {
  initialize,
  createNameTag,
  addEvent,
  getTitlesOfVideoTags,
}

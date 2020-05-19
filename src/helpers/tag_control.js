import path from "path";

const initialize = (element) => {
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}

const initMainViewFrame = () => {
  document.querySelector("#main-view-image-container").setAttribute("style", "top: 50%; transform: translateY(-50%);");
  document.querySelector("#main-view-image").src = path.join("file://", __dirname, "../resources/images/onycom_ci_basic.png");
}

export default {
  initialize,
  initMainViewFrame
}

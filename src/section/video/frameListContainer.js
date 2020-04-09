import tagControl from "../../helpers/tag_control";

const initialize = () => {
  const frameListContainer = document.getElementById("frame-list-container");

  tagControl.initialize(frameListContainer);
}

export default {
  initialize,
}

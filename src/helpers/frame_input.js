
let startFrameInput = document.getElementById("start-frame-input");
let endFrameInput = document.getElementById("end-frame-input");

const setFrameIndex = (index) => {
  const focusPosition = (document.getElementById("start-frame-input").hasAttribute("autofocus") ? "start-frame-input" : "end-frame-input");

  document.getElementById(focusPosition).setAttribute("value", index);
}

// const setStartFrameIndex = (index) => {
//   document.getElementById("start-frame-input").setAttribute("value", index);
// }

// const setEndFrameIndex = (index) => {
//   document.getElementById("end-frame-input").setAttribute("value", index);
// }

const convertInputFocus = () => {
  const focusPosition = (document.getElementById("start-frame-input").hasAttribute("autofocus") ? "end-frame-input" : "start-frame-input");

  document.getElementById("start-frame-input").removeAttribute("autofocus")
  document.getElementById("end-frame-input").removeAttribute("autofocus");

  document.getElementById(focusPosition).setAttribute("autofocus", "");
  document.getElementById(focusPosition).focus();
}

export default {
  setFrameIndex,
  convertInputFocus
}

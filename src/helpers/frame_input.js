const setFrameIndex = (index) => {
  const focusPosition = (document.getElementById("start-frame-input").hasAttribute("autofocus") ? "start-frame-input" : "end-frame-input");

  document.getElementById(focusPosition).innerHTML = index;
}

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

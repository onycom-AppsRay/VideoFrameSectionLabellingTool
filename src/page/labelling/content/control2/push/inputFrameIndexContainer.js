
const setFrameIndex = (index) => {
  const startFrameInput = document.getElementById("start-frame-input");
  const endFrameInput = document.getElementById("end-frame-input");

  if (startFrameInput.hasAttribute("autofocus")) {
    startFrameInput.innerHTML = index;
    return;
  }

  if (endFrameInput.hasAttribute("autofocus")) {
    endFrameInput.innerHTML = index;
    return;
  }
}

const convertInputFocus = () => {
  const startFrameInput = document.getElementById("start-frame-input");
  const endFrameInput = document.getElementById("end-frame-input");

  if (startFrameInput.hasAttribute("autofocus")) {
    startFrameInput.removeAttribute("autofocus");
    endFrameInput.setAttribute("autofocus", true);
    endFrameInput.focus();
    return;
  }

  if (endFrameInput.hasAttribute("autofocus")) {
    endFrameInput.removeAttribute("autofocus");
    startFrameInput.setAttribute("autofocus", true);
    startFrameInput.focus();
    return;
  }
}

const reset = () => {
  const startFrameInput = document.getElementById("start-frame-input");
  const endFrameInput = document.getElementById("end-frame-input");

  startFrameInput.innerText = 0;
  endFrameInput.innerText = 0;

  endFrameInput.removeAttribute("autofocus");

  startFrameInput.focus();
}

export default {
  setFrameIndex,
  convertInputFocus,
  reset
}

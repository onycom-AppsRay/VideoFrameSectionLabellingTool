
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

  const startFrameInputContainer = document.querySelector("#start-frame-input-container .card-body");
  const endFrameInputContainer = document.querySelector("#end-frame-input-container .card-body");

  if (startFrameInput.hasAttribute("autofocus")) {
    startFrameInput.removeAttribute("autofocus");
    endFrameInput.setAttribute("autofocus", true);
    endFrameInput.focus();

    startFrameInputContainer.style.border = "";
    endFrameInputContainer.style.border = "1px solid red";
    return;
  }

  if (endFrameInput.hasAttribute("autofocus")) {
    endFrameInput.removeAttribute("autofocus");
    startFrameInput.setAttribute("autofocus", true);
    startFrameInput.focus();

    startFrameInputContainer.style.border = "1px solid red";
    endFrameInputContainer.style.border = "";
    return;
  }
}

const reset = () => {
  const startFrameInput = document.getElementById("start-frame-input");
  const endFrameInput = document.getElementById("end-frame-input");

  startFrameInput.innerText = 0;
  endFrameInput.innerText = 0;

  startFrameInput.setAttribute("autofocus", "true");
  endFrameInput.removeAttribute("autofocus");

  startFrameInput.focus();
}

export default {
  setFrameIndex,
  convertInputFocus,
  reset
}

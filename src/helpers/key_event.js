import imageControl from "./image_control";
import frameInput from "./frame_input";

import globalFrame from "../model/global/globalFrame";

let keyState = {};

window.addEventListener('keydown', function (e) {
  keyState[e.keyCode || e.which] = true;
}, false);

window.addEventListener('keyup', function (e) {
  keyState[e.keyCode || e.which] = false;
}, false);

window.addEventListener('keydown', function (e) {
  if (e.keyCode == 13) {
    frameInput.convertInputFocus();
  }
}, false);

const frameMove = () => {
  const GlobalFrame = new globalFrame();

  // Arrow up
  if (keyState[38]) {
    const startFrameIndex = document.getElementById("start-frame-input").innerText;
    const endFrameIndex = document.getElementById("end-frame-input").innerText;

    if (GlobalFrame.AT > 0) {
      const nextImgIndex = GlobalFrame.AT - 1;

      const image = document.querySelector(`img[data-index='${nextImgIndex}'`);

      markSelectedFrame(GlobalFrame.AT, nextImgIndex);

      image.scrollIntoView({ behavior: "auto", block: "center", inline: "nearest" });

      imageControl.setMainViewImage(image.src);

      frameInput.setFrameIndex(nextImgIndex);

      GlobalFrame.setAT(nextImgIndex)
    }
  }

  // Arrow down
  if (keyState[40]) {
    const startFrameIndex = document.getElementById("start-frame-input").innerText;
    const endFrameIndex = document.getElementById("end-frame-input").innerText;

    if (GlobalFrame.AT < (GlobalFrame.LENGTH - 1)) {
      const nextImgIndex = GlobalFrame.AT + 1;

      const image = document.querySelector(`img[data-index='${nextImgIndex}'`);

      markSelectedFrame(GlobalFrame.AT, nextImgIndex);

      image.scrollIntoView({ behavior: "auto", block: "center", inline: "nearest" });

      imageControl.setMainViewImage(image.src);

      frameInput.setFrameIndex(nextImgIndex);

      GlobalFrame.setAT(nextImgIndex)
    }
  }

  setTimeout(frameMove, 100);
}

const markSelectedFrame = (before, now) => {
  const beforeFrame = document.querySelector(`#frame-list-container img[data-index="${before}"]`)
  beforeFrame.style.borderColor = "lightgray";

  const nowFrame = document.querySelector(`#frame-list-container img[data-index="${now}"]`);
  nowFrame.style.borderColor = "red";
}

frameMove();

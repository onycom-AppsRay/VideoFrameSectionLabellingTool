import { remote } from "electron";

import imageControl from "../../../../../helpers/image_control";

const frameListContainer = document.getElementById("frame-list-container");

frameListContainer.addEventListener("click", (event) => {
  if(event.target.tagName == "CANVAS") {
    const canvas = event.target;
    const clickedFrameIndex = canvas.dataset.index;

    imageControl.setMainViewImage(canvas.toDataURL("image/jpeg"));

    const nowFrameIndex = remote.getGlobal("sharedObject").FRAME.AT;
    const nowImgTag = document.querySelector(`#frame-list-container canvas[data-index="${nowFrameIndex}"]`);

    nowImgTag.style.borderColor = "lightgray";

    remote.getGlobal("sharedObject").FRAME.AT = Number.parseInt(clickedFrameIndex);
    const clickedFrameTag = document.querySelector(`#frame-list-container canvas[data-index="${clickedFrameIndex}"]`);
    clickedFrameTag.style.borderColor = "red";

    const startFrameInput = document.getElementById("start-frame-input");
    const endFrameInput = document.getElementById("end-frame-input");

    if (startFrameInput.hasAttribute("autofocus")) {
      startFrameInput.innerHTML = clickedFrameIndex;
    }

    if (endFrameInput.hasAttribute("autofocus")) {
      endFrameInput.innerHTML = clickedFrameIndex;
    }
  }
})

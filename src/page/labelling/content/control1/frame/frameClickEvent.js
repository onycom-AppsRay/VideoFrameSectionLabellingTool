import { remote } from "electron";

import imageControl from "../../../../../helpers/image_control";

const frameListContainer = document.getElementById("frame-list-container");

frameListContainer.addEventListener("click", (event) => {
  if(event.target.tagName == "IMG") {
    const imgTag = event.target;

    const clickedFrameIndex = imgTag.dataset.index;

    imageControl.setMainViewImage(imgTag.src);

    const nowFrameIndex = remote.getGlobal("sharedObject").FRAME.AT;
    const nowImgTag = document.querySelector(`#frame-list-container img[data-index="${nowFrameIndex}"]`);

    nowImgTag.style.borderColor = "lightgray";

    remote.getGlobal("sharedObject").FRAME.AT = Number.parseInt(clickedFrameIndex);
    const clickedFrameTag = document.querySelector(`#frame-list-container img[data-index="${clickedFrameIndex}"]`);
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

  if(event.target.tagName == "CANVAS") {
    const clickedCanvas = event.target;

    const mainContainer = document.getElementById("main-view-image-container");

    if(mainContainer.hasChildNodes()) {
      let children = mainContainer.childNodes;

      for(let i = 0; i < children.length; i++) {
        if(children[i].tagName == "CANVAS") {
          children[i].remove();

          break;
        }
      }
    }

    mainContainer.appendChild(clickedCanvas);
  }
})

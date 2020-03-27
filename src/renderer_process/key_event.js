import imageControl from "../helpers/image_control";
import frameInput from "../helpers/frame_input";

import globalFrame from "../model/globalFrame";

let keyState = {};

window.addEventListener('keydown', function (e) {
  keyState[e.keyCode || e.which] = true;
}, true);

window.addEventListener('keyup', function (e) {
  keyState[e.keyCode || e.which] = false;
}, true);

window.addEventListener('keydown', function (e) {
  if(e.keyCode == 13) {
    frameInput.convertInputFocus();
  }
}, true);

const frameMove = () => {
  const GlobalFrame = new globalFrame();

  // Arrow up
  if (keyState[38]) {
    if (GlobalFrame.AT > 0) {
      const nextImgIndex = GlobalFrame.AT - 1;

      const image = document.querySelector(`img[data-index='${nextImgIndex}'`);

      image.scrollIntoView();

      imageControl.setMainViewImage(image.src);

      frameInput.setFrameIndex(nextImgIndex);

      GlobalFrame.setAT(nextImgIndex)
    }
  }

  // Arrow down
  if (keyState[40]) {
    if (GlobalFrame.AT < (GlobalFrame.LENGTH - 1)) {
      const nextImgIndex = GlobalFrame.AT + 1;

      const image = document.querySelector(`img[data-index='${nextImgIndex}'`);

      image.scrollIntoView();

      imageControl.setMainViewImage(image.src);

      frameInput.setFrameIndex(nextImgIndex);

      GlobalFrame.setAT(nextImgIndex)
    }
  }

  setTimeout(frameMove, 100);
}

frameMove();

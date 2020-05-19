import mainViewContainer from "../page/labelling/content/main/mainViewContainer";
import inputFrameIndexContainer from "../page/labelling/content/control2/push/inputFrameIndexContainer";

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
    // frame push event
    document.getElementById("section-confirm").click();
  }

  if (e.keyCode == 37 || e.keyCode == 39) {
    inputFrameIndexContainer.convertInputFocus();
  }
}, false);

const frameMove = () => {
  const GlobalFrame = new globalFrame();

  // Arrow up
  if (keyState[38]) {
    // 프레임 인덱스가 '0' 보다 작은 경우는 없으므로, 'key event' 행위를 막는다.
    if ((GlobalFrame.AT > 0)) {
      const nextImgIndex = GlobalFrame.AT - 1;
      document.getElementById("frame-index").innerText = nextImgIndex;

      const canvas = document.querySelector(`canvas[data-index='${nextImgIndex}'`);

      mainViewContainer.setMainViewImage(canvas.toDataURL("image/jpeg"));
      
      inputFrameIndexContainer.setFrameIndex(nextImgIndex);
      
      GlobalFrame.setAT(nextImgIndex);

      markSelectedFrame(GlobalFrame.AT, nextImgIndex);

      canvas.scrollIntoViewIfNeeded(true);
    }
  }

  // Arrow down
  if (keyState[40]) {
    if (GlobalFrame.AT < (GlobalFrame.LENGTH - 1)) {
      const nextImgIndex = GlobalFrame.AT + 1;
      document.getElementById("frame-index").innerText = nextImgIndex;

      const canvas = document.querySelector(`canvas[data-index='${nextImgIndex}'`);

      mainViewContainer.setMainViewImage(canvas.toDataURL("image/jpeg"));
      
      inputFrameIndexContainer.setFrameIndex(nextImgIndex);
      
      GlobalFrame.setAT(nextImgIndex);
      
      markSelectedFrame(GlobalFrame.AT, nextImgIndex);

      canvas.scrollIntoViewIfNeeded(true);
    }
  }

  setTimeout(frameMove, 100);
}

const markSelectedFrame = (before, now) => {
  document.querySelector(`#frame-list-container canvas[data-index="${before}"]`).style.borderColor = "lightgray";

  document.querySelector(`#frame-list-container canvas[data-index="${now}"]`).style.borderColor = "red";
}

frameMove();

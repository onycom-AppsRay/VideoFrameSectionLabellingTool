import imageControl from "./image_control";

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
    inputFrameIndexContainer.convertInputFocus();
  }
}, false);

const frameMove = () => {
  const GlobalFrame = new globalFrame();

  // Arrow up
  if (keyState[38]) {
    const startFrameIndex = Number.parseInt(document.getElementById("start-frame-input").innerText);
    const endFrameIndex = Number.parseInt(document.getElementById("end-frame-input").innerText);

    const focusPosition = (document.getElementById("start-frame-input").hasAttribute("autofocus") ? "start-frame-input" : "end-frame-input");

    // 프레임 인덱스가 '0' 보다 작은 경우는 없으므로, 'key event' 행위를 방지한다.
    if ((GlobalFrame.AT > 0)) {
      /**
       * 'start-frame-input' 의 경우, 'end-frame-input' 을 넘어가는 프레임을 탐색하는 것을 방지한다.
       * - 기본적으로 'end-frame-input' 에 입력 된 인덱스 값 까지 라벨링 작업을 완료했다고 생각한다.
       */
      if(focusPosition == "start-frame-input") {
        const nextImgIndex = GlobalFrame.AT - 1;
        const image = document.querySelector(`img[data-index='${nextImgIndex}'`);

        if((endFrameIndex == 0) || (startFrameIndex > endFrameIndex)) {
          markSelectedFrame(GlobalFrame.AT, nextImgIndex);

          image.scrollIntoView({ behavior: "auto", block: "center", inline: "nearest" });

          imageControl.setMainViewImage(image.src);

          inputFrameIndexContainer.setFrameIndex(nextImgIndex);

          GlobalFrame.setAT(nextImgIndex)
        } else {
          image.scrollIntoView({block: "center"});
        }
      }

      /**
       * 'end-frame-input' 의 경우, 'start-frame-input' 을 넘어가는 프레임을 탐색하는 것을 방지한다.
       * - 끝 프레임을 찾는데, 시작 프레임을 지나칠 수 없기 때문이다.
       * - ex) 'End frame index' = 10, 'Start frame index' = 9 일 수는 없다. 10 이상 이어야 한다.
       */
      if(focusPosition == "end-frame-input") {
        const nextImgIndex = GlobalFrame.AT - 1;
        const image = document.querySelector(`img[data-index='${nextImgIndex}'`);

        if((endFrameIndex > startFrameIndex)) {
          markSelectedFrame(GlobalFrame.AT, nextImgIndex);

          image.scrollIntoView({ behavior: "auto", block: "center", inline: "nearest" });

          imageControl.setMainViewImage(image.src);

          inputFrameIndexContainer.setFrameIndex(nextImgIndex);

          GlobalFrame.setAT(nextImgIndex)
        } else {
          image.scrollIntoView({block: "center"});
        }
      }
    }
  }

  // Arrow down
  if (keyState[40]) {
    if (GlobalFrame.AT < (GlobalFrame.LENGTH - 1)) {
      const nextImgIndex = GlobalFrame.AT + 1;

      const image = document.querySelector(`img[data-index='${nextImgIndex}'`);

      markSelectedFrame(GlobalFrame.AT, nextImgIndex);

      image.scrollIntoView({ behavior: "auto", block: "center", inline: "nearest" });

      imageControl.setMainViewImage(image.src);

      inputFrameIndexContainer.setFrameIndex(nextImgIndex);

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

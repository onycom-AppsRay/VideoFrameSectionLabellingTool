import { remote } from "electron";
import imageControl from "../helpers/image_control.js";

let keyState = {};
let GLOBAL_FRAME = remote.getGlobal("sharedObject").FRAME;

window.addEventListener('keydown', function (e) {
  keyState[e.keyCode || e.which] = true;
}, true);

window.addEventListener('keyup', function (e) {
  keyState[e.keyCode || e.which] = false;
}, true);

window.addEventListener('keydown', function (e) {
  if(e.keyCode == 13) {
    changeAutoFocus()
  }
}, true);

const frameMove = () => {
  // Arrow up
  if (keyState[38]) {
    if (GLOBAL_FRAME["AT"] > 0) {
      const image = document.querySelector(`img[data-index='${--GLOBAL_FRAME["AT"]}'`);
      imageControl.setMainViewImage(image);
    }
  }

  // Arrow down
  if (keyState[40]) {
    if (GLOBAL_FRAME["AT"] < (GLOBAL_FRAME["LENGTH"] - 1)) {
      const image = document.querySelector(`img[data-index='${++GLOBAL_FRAME["AT"]}'`);
      imageControl.setMainViewImage(image);
    }
  }

  setTimeout(frameMove, 80);
}

frameMove();

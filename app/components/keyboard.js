let keyState = {};

window.addEventListener('keydown', function (e) {
  keyState[e.keyCode || e.which] = true;
}, true);
window.addEventListener('keyup', function (e) {
  keyState[e.keyCode || e.which] = false;
}, true);

function frameMove() {
  if (keyState[37] || keyState[65]) {
    frameSpotout(document.getElementById(NOW_FRAME_INDEX));

    if (NOW_FRAME_INDEX > 0) {
      CLICKED_ELEMENT = document.getElementById(--NOW_FRAME_INDEX);
      onSelectedFrame(CLICKED_ELEMENT);
      frameSpotlight(CLICKED_ELEMENT);
      CLICKED_ELEMENT.scrollIntoView();
    }
  }

  if (keyState[39] || keyState[68]) {
    frameSpotout(document.getElementById(NOW_FRAME_INDEX));

    if (NOW_FRAME_INDEX < (TOTAL_FRAME_COUNT - 1)) {
      CLICKED_ELEMENT = document.getElementById(++NOW_FRAME_INDEX);
      onSelectedFrame(CLICKED_ELEMENT);
      frameSpotlight(CLICKED_ELEMENT);
      CLICKED_ELEMENT.scrollIntoView();
    }
  }

  if (keyState[13]) {
    changeAutoFocus();
  }

  setTimeout(frameMove, 80);
}
frameMove();
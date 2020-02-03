function renderVideo(filePath, fileName, frameList) {
  // 1) Initialze global variable 'frameList'
  deleteSubFrame(FRAME_LIST.length);

  // 2) 읽어 온 경로 상의 video 
  const videoCapture = new cv.VideoCapture(path.resolve(filePath));
  let frame = videoCapture.read();

  console.log('Start video rendering');

  // TODO(yhpark): Intialize frameList
  FRAME_LIST = [];

  let index = 0;
  while (!frame.empty) {
    FRAME_LIST.push(frame);

    frame = frame.resizeToMax(100);

    const canvasTag = createCanvasTag(frame, index);

    document.getElementById('sub-frame').appendChild(canvasTag);

    index++;

    frame = videoCapture.read();
  }

  console.log('End video rendering');

  renderImage(FRAME_LIST[0], document.getElementById('main-frame-mask'))

  document.getElementById('file-name').innerText = fileName;
  document.getElementById('frame-number').innerHTML = 0;
  document.getElementById(0).scrollIntoView();

  TOTAL_FRAME_COUNT = getTotalFrameCount();
}

function createCanvasTag(frame, index) {
  const canvasTag = document.createElement('canvas');
  canvasTag.setAttribute('class', 'frame');
  canvasTag.setAttribute('id', index);

  renderImage(frame, canvasTag);
  renderImageOnText(canvasTag);

  return canvasTag;
}

function onSelectedFrame(frameTag) {
  const frameIndex = frameTag.id;

  renderImage(FRAME_LIST[frameIndex], document.getElementById('main-frame-mask'));

  setFrameIndex(frameIndex);

  document.getElementById('frame-number').innerHTML = frameIndex;

  NOW_FRAME_INDEX = frameIndex;

  return frameIndex;
}

function deleteSubFrame(frameIndex) {
  NOW_FRAME_INDEX = frameIndex;

  for (let i = 0; i < frameIndex; i++) {
    const subFrame = document.getElementById(i);
    subFrame.remove();
  }
}

function deleteSelectedFrameIndexInputGroup(e) {
  const selectedFrameIndexInputGroup = e.target.parentElement.parentElement;

  if (selectedFrameIndexInputGroup.className == 'input-group frame-index-group') {
    const selectedFrameIndexInput = selectedFrameIndexInputGroup.getElementsByTagName('input');

    const startFrameIndex = selectedFrameIndexInput[0].value;
    const endFrameIndex = selectedFrameIndexInput[1].value;

    markSelectedSection(startFrameIndex, endFrameIndex, 1);
    selectedFrameIndexInputGroup.remove();
  }
}

function deleteAllSelectedFrameIndexInputTag() {
  const inputTagGroups = document.getElementsByClassName('input-group frame-index-group');

  for (let [key, value] of Object.entries(inputTagGroups)) {
    value.remove();
  }
}

function setAutofocus(e) {
  if (e.target.getAttribute('id') == 'start-frame-input') {
    document.getElementById('end-frame-input').removeAttribute('autofocus');
    e.target.setAttribute('autofocus', '');
    return;
  } 
  
  if (e.target.getAttribute('id') == 'end-frame-input') {
    document.getElementById('start-frame-input').removeAttribute('autofocus');
    e.target.setAttribute('autofocus', '');
    return;
  }
}

function setFrameIndex(frameIndex) {
  const isStartTagAutoFocus = START_INPUT_TAG.hasAttribute('autofocus');
  const isEndTagAutoFocus = END_INPUT_TAG.hasAttribute('autofocus');

  if (isStartTagAutoFocus) {
    START_INPUT_TAG.setAttribute('value', frameIndex);
  }

  if (isEndTagAutoFocus) {
    END_INPUT_TAG.setAttribute('value', frameIndex);
  }
}

function createSelectedFrameIndexInputTag(startFrameIndex, endFrameIndex) {
  const inputTagTotalCnt = document.getElementsByClassName('input-group').length;
  const inputTagIdx = inputTagTotalCnt + 1;

  const frameIdxInputGroup = document.createElement('div');
  frameIdxInputGroup.className = 'input-group frame-index-group';
  frameIdxInputGroup.id = `input-group-${inputTagIdx}`;
  frameIdxInputGroup.innerHTML = [
    `<input type="text" aria-label="Start Frame" class="form-control" value="${startFrameIndex}" readonly>`,
    `<input type="text" aria-label="End Frame" class="form-control" value="${endFrameIndex}" readonly>`,
    `<div class="input-group-append">`,
    `<button class="btn btn-outline-secondary" id="btn-delete-selected-frame-index-input" type="button">x</button>`,
    `</div>`
  ].join('');

  const inputContainer = document.getElementById('input-container');
  inputContainer.appendChild(frameIdxInputGroup);
}

/**
 * 확정 프레임 정하기 전 프레임 인덱스 유효성을 검사한다.
 * @param {*} startFrameIndex 
 * @param {*} endFrameIndex 
 * @returnType boolean
 */
function validateSelectedFrameIndex(startFrameIndex, endFrameIndex) {
  // 1) Validate input value
  if ((startFrameIndex == 0) && (endFrameIndex == 0)) {
    alert('Select frame');
    console.log('둘 다 0일 때');
    return false;
  }

  if ((startFrameIndex == endFrameIndex)) {
    alert(`'Start(${startFrameIndex})' and 'End(${startFrameIndex})' must be different.`);
    console.log('두 값이 같을 때');
    return false;
  }

  if ((Number(startFrameIndex) > Number(endFrameIndex))) {
    alert(`'End(${endFrameIndex})' must be greater then 'Start(${startFrameIndex})'`);
    console.log('false');
    return false;
  } else {
    console.log('true');
    return true;
  }
}

function initializeInputTag() {
  START_INPUT_TAG.setAttribute('value', '0');
  START_INPUT_TAG.setAttribute('autofocus', '');

  END_INPUT_TAG.setAttribute('value', '0');
  END_INPUT_TAG.removeAttribute('autofocus');
}

function changeAutoFocus() {
  const startInputTag = document.getElementById('start-frame-input');
  const endInputTag = document.getElementById('end-frame-input');
  const inputSuccessBtn = document.getElementById('sub-frame-success');

  if (startInputTag.hasAttribute('autofocus')) {
    startInputTag.removeAttribute('autofocus');
    endInputTag.setAttribute('autofocus', '');
  } else if (endInputTag.hasAttribute('autofocus')) {
    endInputTag.removeAttribute('autofocus');
    inputSuccessBtn.setAttribute('autofocus', '');
  } else {
    inputSuccessBtn.removeAttribute('autofocus');
    startInputTag.setAttribute('autofocus', '');
  }
}

function markSelectedSection(startFrameIndex, endFrameIndex, opacity) {
  const canvasList = document.getElementsByClassName('frame');

  for (let i = startFrameIndex; i <= endFrameIndex; i++) {
    canvasList[i].style.opacity = opacity;
  }

  if (opacity == 1) {
    SELECTED_FRAME_LIST = unSetSelectedFrameList(startFrameIndex, endFrameIndex, SELECTED_FRAME_LIST);
  } else {
    SELECTED_FRAME_LIST = setSelectedFrameList(startFrameIndex, endFrameIndex, SELECTED_FRAME_LIST);
  }

  console.log('marking list: ', SELECTED_FRAME_LIST);
}

function getTotalFrameCount() {
  const frameList = document.getElementsByClassName('frame');
  const length = frameList.length;

  NOW_FRAME_INDEX = 0

  SELECTED_FRAME_LIST = initializeFrameList(length);
  console.log('initialize: ', SELECTED_FRAME_LIST);

  return length;
}
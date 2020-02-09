function renderVideo(filePath, fileName, frameList) {
  // 0) run-time
  videoRunTimeInOpenCV(filePath);

  // 1) Initialze global variable 'frameList'
  deleteSubFrame(FRAME_LIST.length);

  // 2) 읽어 온 경로 상의 video 
  const videoCapture = new cv.VideoCapture(path.resolve(filePath));
  let frame = videoCapture.read();

  VIDEO_FILE_FPS = videoCapture.get(cv.CAP_PROP_FPS);
  document.getElementById('video-file-fps').innerHTML = VIDEO_FILE_FPS + ' fps';

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

  renderImage(FRAME_LIST[0], document.getElementById('main-frame-mask'))
  // mainFrameSize();

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

  nowVideoTime(VIDEO_FILE_FPS, frameIndex);

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
    return false;
  }

  if ((Number(startFrameIndex) > Number(endFrameIndex))) {
    alert(`'End(${endFrameIndex})' must be greater then 'Start(${startFrameIndex})'`);
    return false;
  } else {
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

  if (startInputTag.hasAttribute('autofocus')) {
    startInputTag.removeAttribute('autofocus');
    endInputTag.setAttribute('autofocus', '');
  } else if (endInputTag.hasAttribute('autofocus')){
    endInputTag.removeAttribute('autofocus');
  } else {
    startInputTag.removeAttribute('autofocus');
    endInputTag.removeAttribute('autofocus');
  }
}

function markSelectedSection(startFrameIndex, endFrameIndex, opacity) {
  const canvasList = document.getElementsByClassName('frame');

  for (let i = startFrameIndex; i <= endFrameIndex; i++) {
    canvasList[i].style.opacity = opacity;
    
    if (opacity == 1) {
      SELECTED_FRAME_LIST = unSetSelectedFrameList(startFrameIndex, endFrameIndex, SELECTED_FRAME_LIST);
    } else {
      SELECTED_FRAME_LIST = setSelectedFrameList(startFrameIndex, endFrameIndex, SELECTED_FRAME_LIST);
    }
  }
}

function getTotalFrameCount() {
  const frameList = document.getElementsByClassName('frame');
  const length = frameList.length;

  NOW_FRAME_INDEX = 0

  SELECTED_FRAME_LIST = initializeFrameList(length);

  return length;
}

function videoRunTimeInOpenCV(filePath) {
  const videoCapture = new cv.VideoCapture(filePath);

  const fps = videoCapture.get(cv.CAP_PROP_FPS);
  const frameCount = videoCapture.get(cv.CAP_PROP_FRAME_COUNT);
  const duration = (frameCount / fps);

  const minutes = Math.floor(duration/60);
  const seconds = Math.round(duration%60);

  document.getElementById('file-run-time').innerHTML = `${minutes}:${seconds}`;
}

function nowVideoTime(videoFileFPS, frameIndex) {
  const fps = videoFileFPS;

  const duration = (frameIndex / fps);

  const minutes = Math.floor(duration/60);
  const seconds = Math.round(duration%60);

  document.getElementById('now-video-time').innerHTML = `${minutes}:${seconds}`;
}
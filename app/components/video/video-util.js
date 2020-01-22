const cv = require('opencv4nodejs');

let frameList = [];

function onVideoSelected(e) {
  deleteSubFrame(frameList.length);

  console.log(e.target.innerText);

  const filePath = e.target.id;

  frameList = [];

  const videoCapture = new cv.VideoCapture(path.resolve(filePath));
  let frame = videoCapture.read();

  let i = 0;

  console.log('Video Loading Start');

  while (!frame.empty) {
    frameList.push(frame);
    frame = frame.resizeToMax(200);

    // frame flow part
    const canvas = document.createElement('canvas');
    canvas.setAttribute('class', `frame`);
    canvas.setAttribute('id', i);
    canvas.setAttribute('onclick', 'onSelectedFrame(event)');

    renderImage(frame, canvas);
    renderImageOnText(canvas);

    const container = document.getElementById('sub-frame');
    container.appendChild(canvas);

    i++;
    frame = videoCapture.read();
  }

  console.log('Video Loading End');

  renderImage(frameList[0], document.getElementById('main-frame-mask'))
}

function onSelectedFrame(e) {
  const frameIdx = e.target.getAttribute('id');

  renderImage(frameList[frameIdx], document.getElementById('main-frame-mask'));
  
  document.getElementById('frame-number').innerText = frameIdx;

  inputTagFocusing(frameIdx);
}

function deleteSubFrame(frameIdx) {
  for(let i = 0; i < frameIdx; i++) {
    const subFrame = document.getElementById(i);
    subFrame.remove();
  }
}

function onSubFrameSuccess(e) {
  const inputTagTotalCnt = document.getElementsByClassName('input-group').length;

  const inputTagIdx = inputTagTotalCnt + 1;

  const frameIdxInputGroup = document.createElement('div');
  frameIdxInputGroup.className = 'input-group';
  frameIdxInputGroup.id = `input-group-${inputTagIdx}`;
  frameIdxInputGroup.innerHTML = [
    `<input type="text" aria-label="Start Frame" class="form-control" id="start-frame-${inputTagIdx}">`,
    `<input type="text" aria-label="End Frame" class="form-control" id="end-frame-${inputTagIdx}">`,
    `<div class="input-group-append">`,
    `<button class="btn btn-outline-secondary" onclick="onDeleteInputTag(${inputTagIdx})" type="button">x</button>`,
    `</div>`
  ].join('');

  const inputContainer = document.getElementById('input-container');
  inputContainer.appendChild(frameIdxInputGroup);
}

function onDeleteInputTag(idx) {
  const inputTag = document.getElementById(`input-group-${idx}`);

  if (inputTag) {
    inputTag.remove();
  }
}

/**
 * 
 * @param {*} frameIdx 
 * 'start-frame-input' tag 와 'end-frame-input' tag에 'value'가 존재 하면 넣지 않고,
 * 둘 중에 하나라도 비어있는 'value' option 이 있으면 거기에 값을 넣어 준다.
 */
function inputTagFocusing(frameIdx) {
  const startFrameInput = document.getElementById('start-frame-input');
  const endFrameInput = document.getElementById('end-frame-input');

  let focusEle = document.activeElement;
  if (document.getElementById('start-frame-input') == focusEle) {
    console.log(true);
  }

  startFrameInput.value = frameIdx;
  
  // console.log('INPUT TAG FOCUSING: ', startFrameIdx, endFrameIdx, frameIdx);
}
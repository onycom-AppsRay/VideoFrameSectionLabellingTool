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
    canvas.setAttribute('onmouseover', 'frameSpotlight(this)');
    canvas.setAttribute('onmouseout', 'frameSpotout(this)');

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

function onSelectedFrame(frameTag) {
  const frameIndex = frameTag.id;

  renderImage(frameList[frameIndex], document.getElementById('main-frame-mask'));
  
  document.getElementById('frame-number').innerText = frameIndex;

  setFrameIndex(frameIndex);

  return frameIndex;
}

function deleteSubFrame(frameIdx) {
  for(let i = 0; i < frameIdx; i++) {
    const subFrame = document.getElementById(i);
    subFrame.remove();
  }
}

function onSubFrameSuccess(e) {
  const frameIndexList = sendFrameIndex();

  const startFrameIndex = frameIndexList[0];
  const endFrameIndex = frameIndexList[1];

  if (frameIndexValidation(startFrameIndex, endFrameIndex)) {
    const inputTagTotalCnt = document.getElementsByClassName('input-group').length;

    const inputTagIdx = inputTagTotalCnt + 1;

    const frameIdxInputGroup = document.createElement('div');
    frameIdxInputGroup.className = 'input-group frame-index-group';
    frameIdxInputGroup.id = `input-group-${inputTagIdx}`;
    frameIdxInputGroup.innerHTML = [
      `<input type="text" aria-label="Start Frame" class="form-control frame-index" id="start-frame-${inputTagIdx}" value="${startFrameIndex}" readonly>`,
      `<input type="text" aria-label="End Frame" class="form-control frame-index" id="end-frame-${inputTagIdx}" value="${endFrameIndex}" readonly>`,
      `<div class="input-group-append">`,
      `<button class="btn btn-outline-secondary" onclick="onDeleteInputTag(${inputTagIdx})" type="button">x</button>`,
      `</div>`
    ].join('');

    const inputContainer = document.getElementById('input-container');
    inputContainer.appendChild(frameIdxInputGroup);

    initializeInputTag();
  }
}

function onDeleteInputTag(idx) {
  const inputTag = document.getElementById(`input-group-${idx}`);

  // 'frame flow' 상에서 테두리 없애주기
  const startFrame = document.getElementById(`start-frame-${idx}`);
  const endFrame = document.getElementById(`end-frame-${idx}`);

  const startFrameIndex = startFrame.getAttribute('value');
  const endFrameIndex = endFrame.getAttribute('value');

  frameSelectedSection(startFrameIndex, endFrameIndex, '');

  if (inputTag) {
    inputTag.remove();
  }
}

function setAutofocus (e) {
  const focusElement = e.target.getAttribute('id');

  const startInputTag = document.getElementById('start-frame-input');
  const endInputTag = document.getElementById('end-frame-input');

  startInputTag.removeAttribute('autofocus');
  endInputTag.removeAttribute('autofocus');

  document.getElementById(focusElement).setAttribute('autofocus', '');
}

function setFrameIndex (frameIndex) {
  const startInputTag = document.getElementById('start-frame-input');
  const endInputTag = document.getElementById('end-frame-input');

  const isStartTagAutoFocus = startInputTag.getAttribute('autofocus');
  const isEndTagAutoFocus = endInputTag.getAttribute('autofocus');

  if (isStartTagAutoFocus == '') {
    startInputTag.setAttribute('value', frameIndex);
  }

  // start frame index 보다 큰 조건 필요
  if (isEndTagAutoFocus == '') {
    endInputTag.setAttribute('value', frameIndex);
  }
}

/**
 * * return type 'Boolean'
 * - 'true': 프레임 인덱스 확정 텍스트 생성
 * - 'false': alert
 */
function sendFrameIndex () {
  const startInputTag = document.getElementById('start-frame-input');
  const endInputTag = document.getElementById('end-frame-input');

  const startFrameIndex = startInputTag.getAttribute('value');
  const endFrameIndex = endInputTag.getAttribute('value');

  // frame selected section
  frameSelectedSection(startFrameIndex, endFrameIndex, '5px solid red');
  
  return [startFrameIndex, endFrameIndex];
}

/**
 * 확정 프레임 정하기 전 프레임 인덱스 유효성을 검사한다.
 * @param {*} startFrameIndex 
 * @param {*} endFrameIndex 
 * @returnType boolean
 */
function frameIndexValidation(startFrameIndex, endFrameIndex) {
  console.log('START: ', startFrameIndex, ' END: ', endFrameIndex);

  if(startFrameIndex && endFrameIndex) {
    if(startFrameIndex < endFrameIndex) {
      return true;
    } else {
      alert('End Frame은 Start Frame 보다 커야 한다.');
      return false;
    }
  } else {
    alert('Frame 인덱스 값을 입력 하세요');
    return false;
  }
}

function initializeInputTag () {
  const startInputTag = document.getElementById('start-frame-input');
  const endInputTag = document.getElementById('end-frame-input');

  startInputTag.setAttribute('value', '');
  endInputTag.setAttribute('value', '');

  startInputTag.setAttribute('autofocus', '');
  endInputTag.removeAttribute('autofocus');
}

// complete
/**
 * 'frameList' 에 표시 하기
 */
function onCompleteSubmit () {
  if(confirm('pkl 파일을 생성하시겠습니까?')) { 
    const frameIndexList = [];
    
    const inputTagList = document.getElementsByClassName('frame-index');
    
    for (let [key, value] of Object.entries(inputTagList)) {
      console.log(`${key}: ${value.getAttribute('value')}`);
      
      const frameIndex = value.getAttribute('value');
      
      frameIndexList.push(frameIndex);

      console.log(frameIndex);
    }
    
    console.log('frame list:', frameList.length);
    console.log(frameIndexList);
  }
}

function changeAutoFocus () {
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
  // else if (inputSuccessBtn.hasAttribute('autofocus')) {
  //   startInputTag.setAttribute('autofocus', '');
  // }
}
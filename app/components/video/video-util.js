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
  const frameIndex = e.target.getAttribute('id');

  renderImage(frameList[frameIndex], document.getElementById('main-frame-mask'));
  
  document.getElementById('frame-number').innerText = frameIndex;

  setFrameIndex(frameIndex);
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

function onDeleteInputTag(idx) {
  const inputTag = document.getElementById(`input-group-${idx}`);

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
    startInputTag.innerText = frameIndex;
  }

  // start frame index 보다 큰 조건 필요
  if (isEndTagAutoFocus == '') {
    const startFrameIndex = startInputTag.getAttribute('value');

    if(startFrameIndex > frameIndex) {
      alert('End Frame 은 Start Frame 보다 커야 한다.');
    } else {
      endInputTag.setAttribute('value', frameIndex);
      endInputTag.innerText = frameIndex;
    }
  }
}

function sendFrameIndex () {
  const startInputTag = document.getElementById('start-frame-input');
  const endInputTag = document.getElementById('end-frame-input');

  const startFrameIndex = startInputTag.getAttribute('value');
  const endFrameIndex = endInputTag.getAttribute('value');

  startInputTag.setAttribute('value', '');
  endInputTag.setAttribute('value', '');

  return [startFrameIndex, endFrameIndex];
}

function initializeInputTag () {
  const startInputTag = document.getElementById('start-frame-input');
  const endInputTag = document.getElementById('end-frame-input');

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
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
  console.log(e.target);

  const frameIdx = e.target.getAttribute('id');

  renderImage(frameList[frameIdx], document.getElementById('main-frame-mask'));
  
  document.getElementById('frame-number').innerText = frameIdx;


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

function setAutofocus (e) {
  const focusElement = e.target.getAttribute('id');

  const startInputTag = document.getElementById('start-frame-input');
  const endInputTag = document.getElementById('end-frame-input');

  startInputTag.removeAttribute('autofocus');
  endInputTag.removeAttribute('autofocus');

  document.getElementById(focusElement).setAttribute('autofocus', '');
}
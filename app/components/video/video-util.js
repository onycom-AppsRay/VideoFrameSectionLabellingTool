var cv = require('opencv4nodejs');

let frameList;

function onVideoSelected(e) {
  const filePath = e.target.id;

  frameList = [];

  selectedFile = filePath;

  const vCap = new cv.VideoCapture(selectedFile);
  
  let i = 0;
  let frame;

  console.log('Video Loading Start');

  do {
    frame = vCap.read();
    if(frame.empty) break;

    const frame2 = frame.resizeToMax(300);

    frameList.push(frame2);
    
    const canvas = document.createElement('canvas');
    canvas.setAttribute('class', 'video-frame');
    canvas.setAttribute('id', `${i}`);
    canvas.setAttribute('onclick', 'onSelectedFrame(event)');

    const container = document.getElementById('frame-flow');
    container.appendChild(canvas);

    renderImage(frame2, document.getElementById(`${i}`));

    i++;
  } while(!frame.empty);

  console.log('Video Loading End');

  renderImage(frameList[0], document.getElementById('mask'))
}

function onSelectedFrame(e) {
  const frameIdx = e.target.getAttribute('id');

  renderImage(frameList[frameIdx], document.getElementById('mask'));
  
  document.getElementById('frame-number').innerText = `Selected Frame Index: ${idx}`;
}
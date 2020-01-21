const cv = require('opencv4nodejs');

const frameList = [];

function onVideoSelected(e) {
  console.log(e.target.innerText);

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

    const frame2 = frame.resizeToMax(200);

    frameList.push(frame2);
    
    const canvas = document.createElement('canvas');
    canvas.setAttribute('class', 'video-frame');
    canvas.setAttribute('id', `${i}`);
    canvas.setAttribute('onclick', 'onSelectedFrame(event)');

    const container = document.getElementById('sub-frame');
    container.appendChild(canvas);

    renderImage(frame2, document.getElementById(`${i}`));

    i++;
  } while(!frame.empty);

  console.log('Video Loading End');

  renderImage(frameList[0], document.getElementById('mask'))
}

function onSelectedFrame(e) {
  const frameIdx = e.target.getAttribute('id'); // tag 'id' option 을 통해서, index 가져옴

  renderImage(frameList[frameIdx], document.getElementById('mask'));
  
  document.getElementById('frame-number').innerText = `Selected Frame Index: ${frameIdx}`;

  const frame = document.getElementById('frame-number');
  const backgroundColor = frame.style.backgroundColor;

  console.log('onSelectedFrame() - backgroundColor: ', backgroundColor);

  if(backgroundColor === '') {
    frame.style.backgroundColor = 'black';
  } else {
    frame.style.backgroundColor = '';
  }
}

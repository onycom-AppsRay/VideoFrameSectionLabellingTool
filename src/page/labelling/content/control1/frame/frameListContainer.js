import tagControl from "../../../../../helpers/tag_control";
import imageControl from "../../../../../helpers/image_control";

const initialize = () => {
  const frameListContainer = document.getElementById("frame-list-container");
  tagControl.initialize(frameListContainer);
}

const createCanvas = (frame, imgData, index) => {
  const canvas = document.createElement('canvas');
  canvas.height = frame.rows;
  canvas.width = frame.cols;

  canvas.style.width = "100%";
  canvas.style.height = "autu";
  canvas.style.border = "2px solid lightgray";
  canvas.dataset.index = index;

  // canvas.setAttribute("style", "width: 100%; height: auto; border: 2px solid lightgray");
  
  // set image data
  const ctx = canvas.getContext('2d');

  ctx.putImageData(imgData, 0, 0);
  imageControl.drawStroked(ctx, index, (frame.cols / 2), (frame.rows / 2));

  return canvas;
}

export default {
  initialize,
  createCanvas
}

import tagControl from "../../../../../helpers/tag_control";

const initialize = () => {
  const frameListContainer = document.getElementById("frame-list-container");
  tagControl.initialize(frameListContainer);
}

const drawStroked = (ctx, text, x, y) => {
  ctx.font = "20rem Sans-serif";
  ctx.strokeStyle = "black";
  ctx.textAlign = "center";
  ctx.lineWidth = 4;
  ctx.strokeText(text, x, y);
  ctx.fillStyle = "white";
  ctx.fillText(text, x, y);
}

const createCanvas = (imgData, index) => {
  const canvas = document.createElement("canvas");
  canvas.height = imgData.height;
  canvas.width = imgData.width;

  canvas.style.width = "100%";
  canvas.style.height = "auto";
  canvas.style.border = "2px solid lightgray";
  canvas.dataset.index = index;

  // set image data
  const ctx = canvas.getContext('2d');
  ctx.putImageData(imgData, 0, 0);
  // drawStroked(ctx, index, (imgData.width / 2), (imgData.height / 2));

  return canvas;
}

export default {
  initialize,
  drawStroked,
  createCanvas,
}

function initializeFrameList(length) {
  return new Array(length).fill(0);
}

/**
 * 
 * @param {*} frameList 
 * @param {*} selectedFrameList ex) [0, 1, 1, 0, 0, 0, ... ];
 */
function setSelectedFrameList(startFrameIndex, endFrameIndex, selectedFrameList) {
  for (let i = startFrameIndex; i <= endFrameIndex; i++) {
    selectedFrameList[i] = 1;
  }
  return selectedFrameList;
}

function unSetSelectedFrameList(startFrameIndex, endFrameIndex, selectedFrameList) {
  for (let i = startFrameIndex; i <= endFrameIndex; i++) {
    selectedFrameList[i] = 0;
  }
  return selectedFrameList;
}
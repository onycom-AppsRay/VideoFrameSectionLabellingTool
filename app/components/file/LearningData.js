const LearningData = (function () {
  
  let loadingDataArr = [];

  function LearningData(fileName) {
    this._fileName = fileName;
  }

  LearningData.prototype.setLoadingData = function (loadingData) {
    loadingDataArr.push(loadingData);
  }

  LearningData.prototype.getLoadingData = function () {
    return loadingDataArr;
  }

  return LearningData;
}());

const testLearning = new LearningData('a.mp4');

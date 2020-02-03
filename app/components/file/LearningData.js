const LearningData = (function () {
  
  let loadingDataArr = [];

  function LearningData(fileName) {
    this._fileName = fileName;
  };

  LearningData.prototype.setLoadingData = function (loadingData) {
    loadingDataArr.push(loadingData);
  };

  LearningData.prototype.getLoadingData = function () {
    return loadingDataArr;
  };

  LearningData.prototype.makeJson = function () {
    return { dirName: loadingDataArr }
  };

  return LearningData;
}());

const testLearning = new LearningData('a.mp4');
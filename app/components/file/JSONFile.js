const JSONFile = (function () {
  
  const loadingDataArr = new Array();

  function JSONFile(fileName) {
    this._fileName = fileName;
  };

  JSONFile.prototype.setLoadingData = function (loadingData) {
    loadingDataArr.push(loadingData);
  };

  JSONFile.prototype.getJSONFileName = function () {
    return this._fileName;
  }

  JSONFile.prototype.getLoadingData = function () {
    return loadingDataArr;
  };

  JSONFile.prototype.makeJSON = function () {
    return JSON.stringify({ loadingData: loadingDataArr });
  };

  return JSONFile;
}());
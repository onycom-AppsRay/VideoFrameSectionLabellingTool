function JSONFile() {
  this.loadingDataList = new Array();
}

JSONFile.prototype.pushLoadingData = function (loadingData){
  this.loadingDataList.push(loadingData);
}

JSONFile.prototype.getLoadingData = function () {
  return this.loadingDataList;
}

JSONFile.prototype.makeJSON = function () {
  return JSON.stringify({ loadingData: this.loadingDataList }, null, ' ');
}
function JSONFile(name) {
  this.name = name;
  this.count = 0;
  this.createAt = new Date();
  this.loadingDataList = new Array();
}

JSONFile.prototype.pushLoadingData = function (loadingData){
  this.loadingDataList.push(loadingData);
  ++this.count;
}

JSONFile.prototype.getLoadingData = function () {
  return this.loadingDataList;
}

JSONFile.prototype.makeJSON = function () {
  return JSON.stringify(
    { 
      'name': this.name,
      'count': this.count,
      'createAt': this.createAt,
      'loadingData': this.loadingDataList 
    }, null, 2);
}
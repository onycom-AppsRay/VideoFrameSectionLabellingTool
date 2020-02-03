function LoadingInfo(videoName, data) {
  this.setLoadingInfo(videoName, data);
};

LoadingInfo.prototype.setLoadingInfo = function (videoName, data) {
  this.loadingInfo = new Object();

  this.loadingInfo.name = videoName;
  this.loadingInfo.data = data;
}

LoadingInfo.prototype.getLoadingInfo = function () {
  return this.loadingInfo;
}

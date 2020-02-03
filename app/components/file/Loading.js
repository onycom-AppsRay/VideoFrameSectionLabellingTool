const Loading = (function () {
  function Loading(fileName, data) {
    this._fileName = fileName;
    this._data = data;
  }

  Loading.prototype.makeJSON = function () {
    return JSON.stringify(
      {
        fileName: this._fileName,
        data: this._data
      }
    );
  }

  return Loading;
}());
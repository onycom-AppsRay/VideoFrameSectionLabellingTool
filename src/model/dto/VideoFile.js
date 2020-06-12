export default class {
  constructor() {
    this.name = "";
    this.path = "";
    this.extension = "";
    this.result = [];
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  getPath() {
    return this.path;
  }

  setPath(path) {
    this.path = path;
    return this;
  }

  getExtension() {
    return this.extension;
  }

  setExtension(extension) {
    this.extension = extension;
    return this;
  }

  getResult() {
    return this.result;
  }

  setResult(result) {
    this.result = result;
    return this;
  }
}

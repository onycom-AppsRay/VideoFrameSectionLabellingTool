export default class {
  constructor(object = "") {
    this.name = object.name;
    this.path = object.path;
    this.extension = object.extension;
  }

  getName(name) {
    return this.name;
  }

  getPath(path) {
    return this.path;
  }

  getExtension(extension) {
    return this.extension;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setPath(path) {
    this.path = path;
    return this;
  }

  setExtension(extension) {
    this.extension = extension;
    return this;
  }
}

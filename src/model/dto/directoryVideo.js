export default class {
  constructor(object = "") {
    this.type = object.type;
    this.name = object.name;
    this.path = object.path;
    this.extension = object.extension;
  }

  getType(type) {
    return this.type;
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

  setType(type) {
    this.type = type;
    return this;
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

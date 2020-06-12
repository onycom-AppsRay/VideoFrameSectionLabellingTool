export default class {
  constructor() {
    this.path = "",
    this.list = []
  }

  setPath(path) {
    this.path = path;
    return this;
  }

  setList(list) {
    this.list = list;
    return this;
  }

  getPath() {
    return this.path;
  }

  getList() {
    return this.list;
  }
}
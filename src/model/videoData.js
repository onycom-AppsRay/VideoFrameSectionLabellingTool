export default class {
  constructor() {
    this.title = "";
    this.createAt = new Object();
    this.frameList = [];
  }

  setTitle(title) {
    this.title = title;
    return this;
  }

  setCreateAt() {
    this.createAt = new Date().toLocaleDateString();
    return this;
  }

  setFrameList(frameList) {
    this.frameList = frameList;
    return this;
  }
}

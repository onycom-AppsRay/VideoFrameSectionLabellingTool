export default class {
  constructor() {
    this.title = "";
    this.createAt = "";
    this.frameList = [];
  }

  setTitle(title) {
    this.title = title;
    return this;
  }

  setCreateAt(createAt) {
    this.createAt = createAt;
    return this;
  }

  setFrameList(frameList) {
    this.frameList = frameList;
    return this;
  }
}

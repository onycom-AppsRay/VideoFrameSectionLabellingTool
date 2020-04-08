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
    this.createAt = new Date().toLocaleString();
    return this;
  }

  setFrameList(frameList) {
    this.frameList = frameList;
    return this;
  }

  convertLabellingDataToFrameList(listLength, LabellingData) {
    let result = new Array(listLength).fill(0);

    LabellingData.forEach((data) => {
      const type = (data.type.charCodeAt(0) - 65) + 1;
      const start = data.start;
      const end = data.end;

      result.fill(type, start, end);
    });

    return result;
  }
}

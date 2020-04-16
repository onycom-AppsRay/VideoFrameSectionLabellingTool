export default class {
  constructor(title = "", frameList = []) {
    this.title = title;
    this.createAt = new Date().toLocaleString();
    this.frameList = frameList;
  }

  setTitle(title) {
    this.title = title;
    return this;
  }

  setFrameList(frameList) {
    this.frameList = frameList;
    return this;
  }

  convertLabellingDatasoFrameList(listLength, LabellingData) {
    let result = new Array(listLength).fill(0);

    LabellingData.forEach((data) => {
      const type = data.type;
      const start = data.start;
      const end = data.end;

      result.fill(type, start, end);
    });

    this.frameList = result;
  }
}

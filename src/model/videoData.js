/**
Labelling 된 데이터 관리
{
  "videoTitle": "202432.mov",
  "createAt": "12312321",
  "frameData": [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, ...]
}
*/

export default class {
  constructor(title = "", createAt = new Date(), frameList = []) {
    this.title = title;
    this.createAt = createAt;
    this.frameList = frameList;
  }

  getFrameList() {
    return this.frameList;
  }

  setFrameList(type, start, end) {
    this.frameList.fill(type, start, (end + 1));
  }
}

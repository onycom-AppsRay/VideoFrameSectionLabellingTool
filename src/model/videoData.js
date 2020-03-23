/**
Labelling 된 데이터 관리
{
  "videoTitle": "202432.mov",
  "createAt": "12312321",
  "frameData": [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, ...]
}
*/
export default class {
  constructor(title = "", createAt = new Date(), frameList = new Array().fill(0)) {
    this.title = title;
    this.createAt = createAt;
    this.frameList = frameList;
  }

  getFrameList() {
    return this.frameList;
  }

  setFrameList(labellingDataList = []) {
    labellingDataList.forEach((labellingData) => {
      const type = labellingData.type;    // Alphabet
      const start = labellingData.start;
      const end = labellingData.end;

      // 'type', 'A = 0', 'B = 1' ... 으로 매칭 시키기
      this.frameList.fill(type, start, (end + 1));
    })
  }
}

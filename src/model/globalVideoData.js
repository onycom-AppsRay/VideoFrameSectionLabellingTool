import { remote } from "electron";

export default class {
  constructor() {
    this.PATH = remote.getGlobal("sharedObject").VIDEO_DATA.PATH;
    this.TITLE = remote.getGlobal("sharedObject").VIDEO_DATA.TITLE;
    this.FRAME_LIST = remote.getGlobal("sharedObject").VIDEO_DATA.FRAME_LIST;
  }

  setPATH(path) {
    remote.getGlobal("sharedObject").VIDEO_DATA.PATH = path;
  }

  setTITLE(title) {
    remote.getGlobal("sharedObject").VIDEO_DATA.TITLE = title;
  }

  setFRAME_LIST(length) {
    remote.getGlobal("sharedObject").VIDEO_DATA.FRAME_LIST = new Array(length).fill(0);
  }

  setLabellingDataToFrameList(LabellingData) {
     LabellingData.forEach((data) => {
      const type = (data.type.charCodeAt(0) - 65) + 1;
      const start = data.start;
      const end = data.end;

      this.FRAME_LIST.fill(type, start, end);
    });
  }
}

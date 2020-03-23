import { remote } from "electron";
import videoData from "../model/videoData";

export default class {
  constructor() {
    this.JSON_FILE = remote.getGlobal("sharedObject").JSON_FILE;
    this.VIDEO_DATA = remote.getGlobal("sharedObject").VIDEO_DATA;
    this.FRAME = remote.getGlobal("sharedObject").FRAME;
  }

  setFrame(at, length) {
    this.FRAME.at = at;
    this.FRAME.length = length;
  }

  setJSONFile(path, name) {
    this.JSON_FILE.PATH = ((path == "") ? this.JSON_FILE.PATH : path);
    this.JSON_FILE.NAME = ((name == "") ? this.JSON_FILE.NAME : name);
  }

  setVideoData(videos) {
    videos.forEach((video) => {
      this.VIDEO_DATA.push(new videoData(video.title, video.createAt, video.frameList));
    });
  }

  getFrame() {
    return this.FRAME;
  }

  getJSONFile() {
    return this.JSON_FILE;
  }

  getVideoData() {
    return this.VIDEO_DATA;
  }
}

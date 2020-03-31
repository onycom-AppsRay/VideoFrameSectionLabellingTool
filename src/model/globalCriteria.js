import { remote } from "electron";

export default class {
  constructor() {
    this.CRITERIA = remote.getGlobal("sharedObject").CRITERIA;
  }
}

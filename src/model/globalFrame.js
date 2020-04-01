import { remote } from "electron";

export default class {
  constructor() {
    this.LENGTH = remote.getGlobal("sharedObject").FRAME.LENGTH;
    this.AT = remote.getGlobal("sharedObject").FRAME.AT;
    this.LIST = remote.getGlobal("sharedObject").FRAME.LIST;
  }

  setLENGTH(length){
    remote.getGlobal("sharedObject").FRAME.LENGTH = Number.parseInt(length);
  }

  setAT(at){
    remote.getGlobal("sharedObject").FRAME.AT = Number.parseInt(at);
  }

  setLIST(frameList){
    remote.getGlobal("sharedObject").FRAME.LIST = Array.prototype.slice.call(frameList);
  }
}

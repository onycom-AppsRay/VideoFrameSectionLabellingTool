import { remote } from "electron";

export default class {
  constructor() {
    this.PATH = remote.getGlobal("sharedObject").JSON_FILE.PATH;
    this.NAME = remote.getGlobal("sharedObject").JSON_FILE.NAME;
  }

  setPATH(path){
    remote.getGlobal("sharedObject").JSON_FILE.PATH = path;
  }

  setNAME(name){
    remote.getGlobal("sharedObject").JSON_FILE.NAME = name;
  }
}

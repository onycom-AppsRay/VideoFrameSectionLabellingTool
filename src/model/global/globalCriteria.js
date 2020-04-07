import { remote } from "electron";

export default class {
  constructor() {
    this.type = "";
    this.text = "";
  }

  setType(type) {
    this.type = type;
    return this;
  }

  setText(text) {
    this.text = text;
    return this;
  }

  initCriteria() {
    remote.getGlobal("sharedObject").CRITERIA = [];
  }

  getCriteria() {
    return remote.getGlobal("sharedObject").CRITERIA;
  }

  setCriteria(criteriaList) {
    remote.getGlobal("sharedObject").CRITERIA = Array.prototype.concat(remote.getGlobal("sharedObject").CRITERIA, criteriaList);
  }
}

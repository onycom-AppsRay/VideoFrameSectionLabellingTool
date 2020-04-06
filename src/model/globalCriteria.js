import { remote } from "electron";

export default class {
  constructor() {
    this.CRITERIA = remote.getGlobal("sharedObject").CRITERIA;
  }

  getCriteria() {
    return remote.getGlobal("sharedObject").CRITERIA;
  }

  setCriteria(criteriaList) {
    remote.getGlobal("sharedObject").CRITERIA = criteriaList;
  }
}

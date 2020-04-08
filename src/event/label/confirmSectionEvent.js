import { remote } from "electron";

const SECTION_CONFIRM = document.getElementById("section-confirm");

SECTION_CONFIRM.addEventListener("click", (event) => {
  const startFrameIndex = document.getElementById("start-frame-input").innerHTML;
  const endFrameIndex = document.getElementById("end-frame-input").innerHTML;
  const CRITERIAS = remote.getGlobal("sharedObject").CRITERIA;


})

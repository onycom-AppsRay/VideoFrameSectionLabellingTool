import { remote } from "electron";

import criteriaContainer from "../../section/criteria/criteriaContainer";

const CRITERIA_APPLY_BTN = document.getElementById("criteria-apply");

CRITERIA_APPLY_BTN.onclick = () => {
  criteriaContainer.initialize();

  const criteriaTags = document.querySelectorAll("#criteria-modal-list li[name=modal-criteria]");

  if(criteriaTags.length <= 0) {
    alert(`criteria is empty`);
    return false;
  }

  let temp = [];

  Array.prototype.forEach.call(criteriaTags, (li) => {
    const type = li.dataset.type;
    const text = li.dataset.text;

    criteriaContainer.showCriteria(type, text);

    temp.push({"type": type, "text": text});
  })

  remote.getGlobal("sharedObject").CRITERIA = temp;
}

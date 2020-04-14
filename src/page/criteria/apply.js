import { remote } from "electron";

import jsonControl from "../../helpers/json_control";

import jsonCriteriaDTO from "../../model/dto/jsonCriteria";
import jsonFileDTO from "../../model/dto/jsonFile";

const goLabellingPageBtn = document.getElementById("go-labelling-page-btn");

goLabellingPageBtn.onclick = () => {
  const criteriaList = document.querySelectorAll(`li[name="inserted-criteria"]`);

  if (criteriaList.length > 0) {
    let criteriaArr = [];

    Array.prototype.forEach.call(criteriaList, (li) => {
      const type = li.childNodes[0].innerText;
      const text = li.childNodes[1].innerText;

      const JSONCriteria = new jsonCriteriaDTO();
      JSONCriteria.setType(type)
        .setText(text);

      criteriaArr.push(JSONCriteria);
      showCriteria(type, text);
    });

    // global
    remote.getGlobal("sharedObject").CRITERIA = criteriaArr;

    // JSON 파일에 'criteria(기준)' 입력
    const globalJSONPath = remote.getGlobal("sharedObject").JSON_FILE.PATH;
    const globalJSONName = remote.getGlobal("sharedObject").JSON_FILE.NAME;

    const json = jsonControl.getJSONFile(String.prototype.concat(globalJSONPath, "/", globalJSONName));
    const content = json.content;

    if(!json.result) {
      alert(content);
      return;
    }

    const JSONFile = new jsonFileDTO(content);
    JSONFile.setCriterias(criteriaArr);

    jsonControl.writeJSONFile(String.prototype.concat(globalJSONPath, "/", globalJSONName), JSONFile);

    // page move
    const formCriteriaPage = document.getElementById("form-criteria-page");
    const jsContent = document.getElementsByClassName("js-content")[0];

    formCriteriaPage.style.display = "none";
    jsContent.style.display = "";

    return;
  } else {
    alert("기준을 입력하세요.");
    return;
  }
}

const showCriteria = (type, criteria) => {
  const li = document.createElement("li");

  li.className = "list-group-item";
  li.innerHTML = [
    `<div class="custom-control custom-radio">`,
    `<input type="radio" class="custom-control-input" id="criteria-${type}" name="criteria" data-type="${type}" data-criteria="${criteria}">`,
    `<label class="custom-control-label" for="criteria-${type}">${type}.&nbsp;${criteria}</label>`,
    `</div>`
  ].join("");

  document.getElementById("criteria-list").appendChild(li);
}

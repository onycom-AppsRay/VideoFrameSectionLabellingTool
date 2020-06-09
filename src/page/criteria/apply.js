import { remote } from "electron";

import tagControl from "../../helpers/tag_control";
import jsonControl from "../../helpers/json/json_control";

import jsonCriteriaDTO from "../../model/dto/jsonCriteria";
import jsonFileDTO from "../../model/dto/jsonFile";

import criteriaContainer from "../../page/labelling/content/control2/criteria/criteriaContainer";

const goLabellingPageBtn = document.getElementById("go-labelling-page-btn");

goLabellingPageBtn.onclick = () => {
  const CriteriaTableTag = document.querySelectorAll(`li[name="inserted-criteria"]`);

  if (CriteriaTableTag.length <= 0) {
    alert("기준을 입력하세요.");

    return false;
  }
  
  const criteriaList = getCriteriaList(CriteriaTableTag);

  Array.prototype.forEach.call(criteriaList, (criteria) => {
    criteriaContainer.setCheckbox(criteria.type, criteria.text);
  })

  console.log(criteriaList);
  return;

  // global
  // remote.getGlobal("sharedObject").CRITERIA = criteriaArr;

  // JSON 파일에 'criteria(기준)' 입력
  const globalJSONPath = remote.getGlobal("sharedObject").JSON_FILE.PATH;

  const json = jsonControl.getJSONFile(globalJSONPath);
  const content = json.content;

  if (!json.result) {
    alert(content);
    return;
  }

  const JSONFile = new jsonFileDTO(content);
  JSONFile.setCriterias(criteriaArr);

  jsonControl.writeJSONFile(globalJSONPath, JSONFile);

  // page move
  document.getElementById("form-criteria-page").style.display = "none";
  document.querySelector(".js-content").style.display = "";

  // initialize
  tagControl.initialize(document.getElementById("criteria-modal-header"));
  document.getElementById("input-criteria2").value = "";

  return;
}

const getCriteriaList = (CriteriaTableTag) => {
  let result = [];

  Array.prototype.forEach.call(CriteriaTableTag, (CriteriaTableRow) => {
    const type = CriteriaTableRow.childNodes[0].innerText;
    const text = CriteriaTableRow.childNodes[1].innerText;

    result.push({
      "type": type,
      "text": text
    });
  })

  return result;
}
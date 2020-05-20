import path from "path";

import jsonControl from "./helpers/json/json_control";
import jsonContentDTO from "./model/dto/jsonFile";
import importExistingFile from "./page/file/importExistingFile";

(() => {
  document.querySelector("#open-directory-page").style.display = "none";
  document.querySelector("#open-file-page").style.display = "none";
  document.querySelector("#form-criteria-page").style.display = "none";
  document.querySelector(".js-content").style.display = "";

  const jsonPath = path.join(__dirname, "../mock/json/20200519114544.json");

  const json = jsonControl.getJSONFile(jsonPath);

  if (json.result) {
    const jsonInfo = new jsonContentDTO(json.content);

    const criterias = jsonInfo.getCriterias();

    Array.prototype.forEach.call(criterias, (criteria) => {
      const type = String.fromCharCode(criteria.type + 64);
      const text = criteria.text;

      importExistingFile.showCriteria(type, text);
    })
  }
})();
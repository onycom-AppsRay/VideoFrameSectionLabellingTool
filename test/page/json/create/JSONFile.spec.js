import jsonFile from "../../../../src/model/dto/JSONFile2";

const displayControl = () => {
  document.querySelector("#open-directory-page").style.display = "none";
  document.querySelector("#open-file-page").style.display = "";
  document.querySelector("#form-criteria-page").style.display = "none";
  document.querySelector("#labelling-page").style.display = "none";
}

const createJSONFile = () => {
  displayControl();
  
  const JSONFile = new jsonFile();

  console.log(JSONFile);
}

export default {
  createJSONFile
}
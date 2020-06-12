
const displayControl = () => {
  document.querySelector("#open-directory-page").style.display = "none";
  document.querySelector("#open-file-page").style.display = "none";
  document.querySelector("#form-criteria-page").style.display = "";
  document.querySelector("#labelling-page").style.display = "none";
}

const init = () => {
  displayControl();

  console.log("Criteria Page");
}

export default {
  init
}
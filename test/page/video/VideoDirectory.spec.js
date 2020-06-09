
const displayControl = () => {
  document.querySelector("#open-directory-page").style.display = "";
  document.querySelector("#open-file-page").style.display = "none";
  document.querySelector("#form-criteria-page").style.display = "none";
  document.querySelector("#labelling-page").style.display = "none";
}

const init = () => {
  displayControl();

  console.log("Video Directory");
}

export default {
  init
}
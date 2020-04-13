const openDirectoryPage = document.getElementById("open-directory-page");
const openFilePage = document.getElementById("open-file-page");
const formCriteriaPage = document.getElementById("form-criteria-page");
const jsContent = document.getElementsByClassName("js-content")[0];

const backBtn = document.getElementById("back-button");

backBtn.addEventListener("click", (event) => {
  openDirectoryPage.style.display = "";
  openFilePage.style.display = "";
  formCriteriaPage.style.display = "";

  jsContent.style.display = "none";
});

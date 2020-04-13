import { remote } from "electron";

const criteriaInsertBtn = document.getElementById("button-addon2");
const goLabellingPageBtn = document.getElementById("go-labelling-page-btn");

criteriaInsertBtn.onclick = () => {
  const li = document.createElement("li");
  const criteria = document.getElementById("input-criteria2").value;

  if(!criteria) {
    alert("기준을 입력하세요.");
    return;
  }

  const type = "test";

  li.className = "list-group-item d-flex justify-content-between align-items-center";
  li.innerHTML = [
    `<span class="badge badge-primary badge-pill">${type}</span>`,
    `<span>${criteria}</span>`
  ].join("");

  document.querySelector("#criteria2-list ul").appendChild(li);
}

goLabellingPageBtn.onclick = () => {
  const criteriaList2 = document.querySelector("#criteria2-list > ul").children;

  if(criteriaList2.length > 1) {
    let tempArr = [];

    Array.prototype.some.call(criteriaList2, (li, index) => {
      if(index != 0) {
        const type = li.childNodes[0].innerText;
        const criteria = li.childNodes[1].innerText;

        tempArr.push({
          "type": type,
          "criteria": criteria
        })
      }
    })

    // global
    remote.getGlobal("sharedObject").CRITERIA = tempArr;

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

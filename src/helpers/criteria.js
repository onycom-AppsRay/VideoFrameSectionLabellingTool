const criteriaInsertBtn = document.getElementById("criteria-insert");
const criteriaInsertSuccessBtn = document.getElementById("criteria-insert-success");
const criteriaInsertBackBtn = document.getElementById("criteria-insert-back");

let criteriaTempList = [];

criteriaInsertBtn.onclick = () => {
  const criteriaElement = document.createElement("li");
  const criteriaElementId = "criteriaTempElement";
  const elementLength = countCriteriaList();

  const text = document.getElementById("inputCriteria").value;
  const type = convertNumberToAlphabet(elementLength);

  if (hasEqualCriteria(text)) {
    alert(`There are overlapping criteria.`);
    return;
  }

  criteriaTempList.push(text);

  criteriaElement.innerHTML = [
    `<li name=${criteriaElementId} class="list-group-item d-flex justify-content-between align-items-center">`,
    `<span class="badge badge-primary badge-pill">${type}</span>`,
    `&nbsp;`,
    `<span class="criteria-temp-text">${text}</span>`,
    `</li>`
  ].join("");

  document.getElementById("criteria-temp-list").appendChild(criteriaElement);
}

const countCriteriaList = () => {
  return document.getElementsByName("criteriaTempElement").length;
}

const convertNumberToAlphabet = (number) => {
  return String.fromCharCode(97 + number).toUpperCase();
}

const hasEqualCriteria = (text) => {
  const criteriaTempTextList = document.querySelectorAll(".criteria-temp-text");

  const result = Array.prototype.some.call(criteriaTempTextList, (criteriaText) => {
    if (criteriaText.innerText == text) {
      return true;
    }
  });

  return result;
}

criteriaInsertSuccessBtn.onclick = () => {
  if (criteriaTempList.length == 0) {
    console.log("criteria is empty");
    return;
  }

  // init
  document.getElementById("criteria-list").innerHTML = "";

  Array.prototype.forEach.call(criteriaTempList, (criteria, index) => {
    const li = document.createElement("li");
    const type = convertNumberToAlphabet(index);

    li.className = "list-group-item";
    li.innerHTML = [
      `<div class="custom-control custom-radio">`,
      `<input type="radio" id="creteria-${index}" name="creteria" data-type="${type}" class="custom-control-input">`,
      `<label class="custom-control-label" for="creteria-${index}">${type}.&nbsp${criteria}</label>`,
      `</div>`
    ].join("");

    document.getElementById("criteria-list").appendChild(li);
  });
}

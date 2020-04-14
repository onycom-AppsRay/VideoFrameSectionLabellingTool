const criteriaInsertBtn = document.getElementById("button-addon2");

criteriaInsertBtn.onclick = () => {
  const criteria = document.getElementById("input-criteria2").value;
  document.getElementById("input-criteria2").value = "";
  document.getElementById("input-criteria2").focus();

  if (!checkInputCriteria(criteria)) return;

  const type = setTypeForInsertedCriteria();

  const li = document.createElement("li");
  li.setAttribute("name", "inserted-criteria");
  li.className = "list-group-item d-flex justify-content-between align-items-center";
  li.innerHTML = [
    `<span class="badge badge-primary badge-pill">${type}</span>`,
    `<span>${criteria}</span>`
  ].join("");

  document.querySelector("#criteria2-list ul").appendChild(li);
}

const checkInputCriteria = (inputCriteria) => {
  if (!inputCriteria) {
    alert("기준을 입력하세요.");
    return false;
  }

  if (hasSameInsertedCriteria(inputCriteria)) {
    alert("동일한 기준이 입력되었습니다.");
    return false;
  }

  return true;
}

const hasSameInsertedCriteria = (inputCriteria) => {
  const criteriaList = document.querySelectorAll(`li[name="inserted-criteria"]`);

  return Array.prototype.some.call(criteriaList, (criteriaSet) => {
    if (criteriaSet.childNodes[1].innerText == inputCriteria) {
      return true;
    }
  });
}

const setTypeForInsertedCriteria = () => {
  const length = getLengthInInsertedCriteriaList();

  return String.fromCharCode(length + 65);
}

const getLengthInInsertedCriteriaList = () => {
  const criteriaList = document.querySelectorAll(`li[name="inserted-criteria"]`);

  return Number.parseInt(criteriaList.length);
}

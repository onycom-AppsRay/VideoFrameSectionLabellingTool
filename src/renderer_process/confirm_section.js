const sectionConfirm = document.getElementById("section-confirm");

sectionConfirm.addEventListener("click", (event) => {
  const startFrameIndex = document.getElementById("start-frame-input").innerHTML;
  const endFrameIndex = document.getElementById("end-frame-input").innerHTML;
  const creteriaList = document.getElementsByName("creteria");

  if(!hasCriteria(creteriaList)) {
    alert("라벨링 기준을 입력하세요!");
    return false;
  }

  const criteriaTag = checkCriteria(creteriaList);

  if(criteriaTag == undefined) {
    alert("라벨링 기준을 선택하세요!");
    return false;
  }

  if (validateSelectedFrameIndex(startFrameIndex, endFrameIndex, creteriaList.length)) {
    const criteria = criteriaTag.dataset.type;

    const message =
      `Confirm with \n` +
      `Criteria: ${criteria} / ` +
      `Start: ${startFrameIndex} / ` +
      `End: ${endFrameIndex} \n`;

    if(!confirm(message)) return;

    pushSectionValueTableRow(criteria, startFrameIndex, endFrameIndex);
  }

  // Complete - '다음 비디오 & initialize'
})

const validateSelectedFrameIndex = (startFrameIndex, endFrameIndex) => {
  if (startFrameIndex == '' || endFrameIndex == '') {
    alert('프레임을 선택하세요.');
    return false;
  }

  if (Number.parseInt(startFrameIndex) > Number.parseInt(endFrameIndex)) {
    alert(`START: ${startFrameIndex} > END: ${endFrameIndex}`);
    return false;
  }

  // 3. reduplicate(overlap)
  return true;
}

const hasCriteria = criteriaList => {
  return (criteriaList.length > 0) ? true : false;
}

const isCriteria = criteriaList => {
  return (criteriaList.length > 0) ? true : false;
}

const pushSectionValueTableRow = (sectionType, startFrameIndex, endFrameIndex) => {
  const tbody = document.querySelector("tbody");
  const rowIndex = (tbody.rows.length + 1);

  const row = document.createElement("tr");
  row.innerHTML = [
    `<th scope="row">${rowIndex}</th>`,
    `<td>${sectionType}</td>`,
    `<td>${startFrameIndex}</td>`,
    `<td>${endFrameIndex}</td>`,
  ].join('');

  row.addEventListener("click", (event) => {
    if (confirm("Delete the row?")) {
      tbody.deleteRow(event.target.parentElement.rowIndex);
    }
  }, false)

  tbody.appendChild(row);
}

const checkCriteria = (creteriaList) => {
  const arr = Array.prototype.slice.call(creteriaList);
  let result;

  arr.some((criteria) => {
    if(criteria.checked == true) {
      result = criteria;

      return true;
    }
  })

  return result;
}

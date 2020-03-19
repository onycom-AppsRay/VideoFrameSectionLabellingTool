const sectionConfirmContainer = document.getElementById("section-confirm-container");

sectionConfirmContainer.addEventListener("click", (event) => {
  // 프레임 선택 기준 제시 해야함.
  const criteria = document.querySelector(`input[name="criteria"]:checked`).value;
  const startFrameIndex = document.getElementById("start-frame-input").value;
  const endFrameIndex = document.getElementById("end-frame-input").value;

  // Alert - '구간 기준' / '구간 시작, 끝' 확인 시켜 주기.
  const message =
    `Confirm with \n` +
    `Criteria: ${criteria} / ` +
    `Start: ${startFrameIndex} / ` +
    `End: ${endFrameIndex} \n`;

  if(!confirm(message)) return;

  // Validate 'Input' tag frame index
  if (validateSelectedFrameIndex(startFrameIndex, endFrameIndex)) {
    // Push frame section
    pushSectionValueTableRow(criteria, startFrameIndex, endFrameIndex);
  }

  // Complete - '다음 비디오 & initialize'
})

const validateSelectedFrameIndex = (startFrameIndex, endFrameIndex) => {
  // 1. Not empty
  if (startFrameIndex == '' || endFrameIndex == '') {
    alert('프레임을 선택하세요.');
    return false;
  }

  // 2. start < end
  if (Number.parseInt(startFrameIndex) > Number.parseInt(endFrameIndex)) {
    alert(`START: ${startFrameIndex} > END: ${endFrameIndex}`);

    return false;
  }

  // 3. reduplicate(overlap)
  return true;
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

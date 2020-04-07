import globalCriteria from "../../model/global/globalCriteria";

import tagControl from "../../helpers/tag_control";

const initialize = () => {
  const criteriaTempList = document.getElementById("criteria-modal-list");

  tagControl.initialize(criteriaTempList);
}

const setCriteria = () => {
  const GlobalCriteria = new globalCriteria();
  const criterias = GlobalCriteria.getCriteria();

  if (criterias.length > 0) {
    Array.prototype.forEach.call(criterias, (criteria) => {
      const type = criteria.type;
      const text = criteria.text;

      showCriteria(type, text);
    })
  }
}

const showCriteria = (type, text) => {
  const li = document.createElement("li");

  const liId = "modal-criteria";

  li.innerHTML = [
    `<li name=${liId} class="list-group-item d-flex justify-content-between align-items-center" data-type="${type}" data-text="${text}">`,
    `<span class="badge badge-primary badge-pill">${type}</span>`,
    `&nbsp;`,
    `<span class="criteria-temp-text">${text}</span>`,
    `</li>`
  ].join("");

  document.getElementById("criteria-modal-list").appendChild(li);
}

const convertNumberToAlphabet = (number) => {
  return String.fromCharCode(97 + number).toUpperCase();
}

export default {
  initialize,
  setCriteria,
  showCriteria
}

import globalCriteria from "../../model/global/globalCriteria";

import tagControl from "../../helpers/tag_control";

const initialize = () => {
  const criteriaTempList = document.getElementById("criteria-list");

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

  // TODO(yhpark): Set index
  const index = type;
  const label = String.fromCharCode(Number.parseInt(type) + 64);

  li.className = "list-group-item";
  li.innerHTML = [
    `<div class="custom-control custom-radio">`,
    `<input type="radio" class="custom-control-input" id="criteria-${index}" name="criteria" data-label="${label}" data-index="${index}" data-text="${text}">`,
    `<label class="custom-control-label" for="criteria-${index}">${label}.&nbsp${text}</label>`,
    `</div>`
  ].join("");

  document.getElementById("criteria-list").appendChild(li);
}

const selectedCriteria = () => {
  const criteriaList = document.querySelectorAll("#criteria-list input[name=criteria]");

  let result = "";
  Array.prototype.some.call(criteriaList, (criteria) => {
    if(criteria.checked == true) {
      result = criteria;
      return true;
    }
  })

  return result;
}

export default {
  initialize,
  setCriteria,
  showCriteria,
  selectedCriteria
}

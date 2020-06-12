import resultContainer from "../result/resultContainer";

const resultListContainer = document.getElementById("result-list-container");

resultListContainer.addEventListener("click", (event) => {
  if(event.target.parentNode.className == "labelling-data-row") {
    if(!confirm("삭제하시겠습니까?")) { return; }

    event.target.parentNode.remove();

    resultContainer.resetTableBodyIndex();
  }
})

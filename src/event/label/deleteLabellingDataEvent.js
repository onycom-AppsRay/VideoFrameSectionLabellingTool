import labellingContainer from "../../section/label/labellingContainer";

const labellingDataList = document.getElementById("result-list-container");

labellingDataList.addEventListener("click", (event) => {
  if(event.target.parentElement.className == "labelling-data-row") {
    const labellingDataTarget = event.target.parentElement;

    if(confirm('Are you sure you want to delete this data?')) {
      labellingDataTarget.remove();
      labellingContainer.resetTableBodyIndex();
    }
  }
});


document.querySelector(`#main-view-image-rate-radio-container`).addEventListener("click", (event) => {
  if (event.target.type == "radio") {
    initRadioActive();

    const rate = checkImageFrameRate();
    const mainViewImage = document.querySelector(`img[id="main-view-image"]`);

    mainViewImage.style.width = (rate + "%");

    console.log("mainViewImage: ", mainViewImage.clientHeight);
    console.log("mainViewImage: ", mainViewImage.clientWidth);

    console.log(rate);
  }
}, false);

const checkImageFrameRate = () => {
  const rateList = document.querySelectorAll(`input[name="image-frame-rate"]`);

  let result = "";

  Array.prototype.some.call(rateList, (rate) => {
    if (rate.checked) {
      result = rate.value;

      rate.closest("label").classList.add("active");

      return true;
    }
  })

  return result;
}

const initRadioActive = () => {
  const labelList = document.querySelectorAll("#main-view-image-rate-radio-container label");

  labelList.forEach((label) => {
    label.classList.remove("active");
  })
}
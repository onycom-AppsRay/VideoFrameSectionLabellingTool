ipcRenderer = require("electron").ipcRenderer;

const sendMessageButton = document.getElementById('save');
let mainCriteria;

ipcRenderer.on('message', (event, message) => {
  mainCriteria = message;
});

sendMessageButton.addEventListener("click", (event) => {
  const input = document.getElementById("inputCriteria");
  const userInputCriteria = input.value;

  let result = true;

  if(userInputCriteria == "") {
    alert("기준을 입력하세요");
    return;
  }

  mainCriteria.some((criteria) => {

    if(criteria == userInputCriteria) {
      result = false;
      return true;
    }
  })

  if(!result) {
    alert("이미 겹치는 기준이 있습니다.");
    return;
  } else {
    if(confirm("저장 하시겠습니까?")) {
      ipcRenderer.send('reply', input.value);
      window.close();
    }
  }
});

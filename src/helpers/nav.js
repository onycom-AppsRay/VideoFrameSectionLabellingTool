document.body.addEventListener('click', (event) => {
  if (event.target.dataset.modal) {
    if(event.target.dataset.modal == "criteria") {
      const modals = document.querySelectorAll('#criteria-list-container.is-shown')
      Array.prototype.forEach.call(modals, (modal) => {
        modal.classList.remove('is-shown')
      })

      const modalId = `${event.target.dataset.modal}-modal`
      document.getElementById(modalId).classList.add('is-shown')

      console.log(modalId);
    } else {
      handleModalTrigger(event)
    }
  } else if (event.target.classList.contains('modal-hide')) {
    showMainContent()
  }
})

function showMainContent() {
  document.querySelector("#about-modal").classList.remove("is-shown");
  document.querySelector("#criteria-modal").classList.remove("is-shown");
  document.querySelector('.js-content').classList.add('is-shown');
  document.querySelector('#criteria-list-container').classList.add('is-shown');
}

function handleModalTrigger(event) {
  hideAllModals()
  const modalId = `${event.target.dataset.modal}-modal`
  document.getElementById(modalId).classList.add('is-shown')
}

function hideAllModals() {
  const modals = document.querySelectorAll('.js-content.is-shown')
  Array.prototype.forEach.call(modals, (modal) => {
    modal.classList.remove('is-shown')
  })
}

showMainContent()

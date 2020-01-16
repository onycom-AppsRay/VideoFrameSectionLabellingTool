const { ipcMain, dialog } = require('electron')

ipcMain.on('open-file-dialog', (event) => {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory', 'multiSelections']
  }).then((files) => {
      event.sender.send('selected-directory', files)
  }).catch((err) => {
    console.log(err)
  })
})
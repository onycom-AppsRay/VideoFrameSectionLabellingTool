import { ipcMain, dialog } from "electron";

ipcMain.on("open-directory-dialog", (event) => {
  dialog.showOpenDialog({
    properties: ["openDirectory"]
  }, (files) => {
    if (files) {
      event.sender.send("selected-directory", files)
    }
  });
});

ipcMain.on("open-json-directory-dialog", (event) => {
  dialog.showOpenDialog({
    properties: ["openDirectory"]
  }, (files) => {
    if (files) {
      event.sender.send("selected-json-directory", files)
    }
  });
});

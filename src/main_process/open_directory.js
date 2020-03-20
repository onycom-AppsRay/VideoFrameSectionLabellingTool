import { ipcMain, dialog } from "electron";

ipcMain.on("open-directory-dialog", (event) => {
  console.log("main", event.target);

  dialog.showOpenDialog({
    properties: ["openDirectory"]
  }, (files) => {
    if (files) {
      event.sender.send("selected-directory", files)
    }
  });
});

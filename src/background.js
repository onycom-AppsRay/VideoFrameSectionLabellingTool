// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from "path";
import url from "url";
import { app, Menu, ipcMain, dialog } from "electron";
import { devMenuTemplate } from "./menu/dev_menu_template";
import { editMenuTemplate } from "./menu/edit_menu_template";
import createWindow from "./helpers/window";

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from "env";

global.sharedObject = {
  DIRECTORY: {
    PATH: "",
    VIDEOS: []
  },
  JSON_FILE: {
    PATH: "",
    NAME: "",
  },
  VIDEO_DATA: {
    PATH: "",
    TITLE: "",
    FRAME_LIST: []
  },
  FRAME: {
    LENGTH: 0,
    AT: 0
  },
  CRITERIA: [],
  COMPLETE_FLAG: true,
}

const setApplicationMenu = () => {
  const menus = [editMenuTemplate];
  if (env.name !== "production") {
    menus.push(devMenuTemplate);
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== "production") {
  const userDataPath = app.getPath("userData");
  app.setPath("userData", `${userDataPath} (${env.name})`);
}

let mainWindow;

app.on("ready", () => {
  setApplicationMenu();

  mainWindow = createWindow("main", {
    width: 1100,
    height: 1000
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "app.html"),
      protocol: "file:",
      slashes: true
    })
  );

  if (env.name === "development") {
    mainWindow.openDevTools();
  }
});

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("open-directory-dialog", (event) => {
  dialog.showOpenDialog({
    properties: ["openDirectory"]
  }, (files) => {
    if (files) {
      event.sender.send("selected-directory", files)
    }
  });
});

ipcMain.on("open-file-dialog", (event) => {
  dialog.showOpenDialog({
    properties: ["openFile"]
  }, (files) => {
    if (files) {
      event.sender.send("selected-file", files)
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

ipcMain.on('reply', (event, message) => {
	mainWindow.webContents.send('messageFromMain', message);
})

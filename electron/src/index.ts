import { app, BrowserWindow } from "electron";
import path from "node:path";
import { MainAPI } from "./classes/MainAPI";

let mainWindow: BrowserWindow;
const mainAPI = new MainAPI();

function createWindows() {
    mainWindow = new BrowserWindow({
        width: 900, height: 900,
        webPreferences: {
            preload: path.join(__dirname, "/preload.js"),
            //nodeIntegration: true,
        },
        show: false
    });

    mainWindow.loadFile(path.join(__dirname + "/browser/index.html"));
    //mainWindow.loadURL('http://localhost:4200/');
    mainWindow.webContents.openDevTools();
    mainWindow.show();
    //mainWindow.on("ready-to-show", () => mainWindow.show());
}

app.whenReady().then(() => {
   
    mainAPI.createIpcMainHandle("getSomeData", (event, arg)=>{
        return 54;
    });
    createWindows()
})
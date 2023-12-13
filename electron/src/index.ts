import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { MainAPI } from "./classes/MainAPI";
import { SequelizeDB } from "./classes/SequelizeDB";
import { ErrorParser } from "./classes/ErrorParser";
import { ErrorDetail } from "Types/error";
import { CurrencyNameAttributes, DonorsNameAttributes, ReceiptAmountNameAttributes } from "Types/sequelizeDBTypes";

let mainWindow: BrowserWindow;
const mainAPI = new MainAPI();

async function createWindows() {
    mainWindow = new BrowserWindow({
        width: 900, height: 900,
        webPreferences: {
            preload: path.join(__dirname, "/preload.js"),
            //nodeIntegration: true,
        },
        show: false
    });

    //mainWindow.loadFile(path.join(__dirname + "/browser/index.html"));
    await mainWindow.loadURL('http://localhost:4200/');
    mainWindow.webContents.openDevTools();
    mainWindow.show();
    //mainWindow.on("ready-to-show", () => mainWindow.show());
}

function handleError(event: Electron.IpcMainInvokeEvent, arg: ErrorDetail) {
    mainAPI.IpcMainSend("receiveError", mainWindow.webContents, arg);
}

app.whenReady().then(async () => {
    const sequelizeDB = new SequelizeDB();
    sequelizeDB.connect().then(() => {
        console.log('path: ' + sequelizeDB.pathFile);
    })
    mainAPI.createIpcMainHandle("getSomeData", async (event, arg) => {
        return 54;
    });
    mainAPI.createIpcMainHandle("getDbPath", async (event, arg) => {
        return sequelizeDB.pathFile;
    });

    mainAPI.createIpcMainHandle("getReceiptAmountNames", async (event, arg) => {
        const t = await sequelizeDB.getAllReceiptAmountNames();
        return t as ReceiptAmountNameAttributes[];
    });
    mainAPI.createIpcMainHandle("getCurrencyNames", async (event, arg) => {
        const t = await sequelizeDB.getAllCurrencyNames();
        return t as CurrencyNameAttributes[];
    });
    mainAPI.createIpcMainHandle("getDonorsNames", async (event, arg) => {
        const t = await sequelizeDB.getAllDonorsNames();
        return t as DonorsNameAttributes[];
    });

    mainAPI.IpcMainOn("sendError", handleError);

    await createWindows()
    setInterval(() => {
        //mainAPI.IpcMainSend("receiveError", mainWindow.webContents, ErrorParser.parseError(new Error('test')));
        mainAPI.IpcMainSend("getDbInfo", mainWindow.webContents, sequelizeDB._infor);
    }, 1000)


})
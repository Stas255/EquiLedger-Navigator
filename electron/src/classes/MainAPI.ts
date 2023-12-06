import { ipcMain } from "electron";
import { TypesInputKeysInvoke, TypesInputInvoke, TypesReturnInvoke, TypesInputKeysSend, TypesReturnSend } from 'Types/index';

export class MainAPI {

    createIpcMainHandle<K extends TypesInputKeysInvoke>
        (channel: K, listener: (event: Electron.IpcMainInvokeEvent, arg: TypesInputInvoke[K]) => Promise<TypesReturnInvoke[K]>) {
        ipcMain.handle(channel, listener);
    }

    IpcMainSend<K extends TypesInputKeysSend>
        (channel: K, webContents: Electron.WebContents, arg: TypesReturnSend[K]) {
        webContents.send(channel, arg);
    }

    
}

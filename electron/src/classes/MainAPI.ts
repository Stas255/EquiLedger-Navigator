import { ipcMain, ipcRenderer } from "electron";
import { TypesKeys, Types, TypesReturn, FunctionMap } from 'Types/index';

export class MainAPI {

    createIpcMainHandle<K extends TypesKeys>
        (channel: K, listener: (event: Electron.IpcMainInvokeEvent, arg: Types[K]) => TypesReturn[K]) {
        ipcMain.handle(channel, listener);
    }

    getRender(): FunctionMap {
        let obj: FunctionMap = {};
        const arrayHandels :Array<TypesKeys> = typesKeys;
        arrayHandels.forEach(element => {
            obj[element] = (arrgument: Types[typeof element]) => 
            ipcRenderer.invoke(element, arrgument) as Promise<TypesReturn[typeof element]>;
            
        });
        return obj;
    }
}

const typesKeys: Array<TypesKeys> = [
    "getSomeData",
    "getSomeData1",
];
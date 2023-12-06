import { FunctionMapInvoke, FunctionMapSend, TypesInputInvoke, TypesInputKeysInvoke, TypesInputKeysSend, TypesReturnSend } from 'Types/index';
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld("electronRenderInvoke", getRenderInvoke());

contextBridge.exposeInMainWorld("electronRenderSend", getRenderOn());

function getRenderInvoke(): FunctionMapInvoke {
    let obj: Partial<FunctionMapInvoke> = {};
    const arrayHandels: Array<TypesInputKeysInvoke> = [
        "getSomeData",
        "getDbPath",
        "getDbData"
    ]
    arrayHandels.forEach(element => {
        obj[element] = (arrgument: TypesInputInvoke[typeof element]) =>
            ipcRenderer.invoke(element, arrgument);
    });
    return obj as FunctionMapInvoke;
}

function getRenderOn(): FunctionMapSend {
    let obj: Partial<FunctionMapSend> = {};
    const eventHandlers: Array<TypesInputKeysSend> = [
        "receiveError",
        "getDbInfo"
    ];

    eventHandlers.forEach(element => {
        obj[element] = (callback: (arrgument: any) => void) => ipcRenderer.on(element, (event, data: TypesReturnSend[typeof element]) => callback(data));
    });

    return obj as FunctionMapSend;
}

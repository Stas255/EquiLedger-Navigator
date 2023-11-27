import { FunctionMap, Types, TypesKeys } from 'Types/index';
import { contextBridge, ipcRenderer } from 'electron';

const test = getRender();
contextBridge.exposeInMainWorld("electronRender",
    test
);

function getRender(): FunctionMap {
    let obj: FunctionMap = {};
    const arrayHandels :Array<TypesKeys> = [
        "getSomeData",
    ]
    arrayHandels.forEach(element => {
        obj[element] = (arrgument: Types[typeof element]) => 
        ipcRenderer.invoke(element, arrgument) ;
        
    });
    return obj;
}

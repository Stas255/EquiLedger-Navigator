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
        ipcRenderer.invoke(element, arrgument) as Promise<TypesReturn[typeof element]>;
        
    });
    return obj;
}

type Types = {
    getSomeData: boolean,
    getSomeData1: boolean
}

type TypesReturn = {
    getSomeData: number,
    getSomeData1: boolean
}

type FunctionMap = {
    [key: string]: (arr: Types[TypesKeys]) => void;
};

type TypesKeys = keyof Types;



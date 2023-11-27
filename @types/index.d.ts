export type Types = {
    getSomeData: boolean,
    getSomeData1: boolean
}

export type TypesReturn = {
    getSomeData: number,
    getSomeData1: boolean
}

export type FunctionMap = {
    [key: string]: (arr: Types[TypesKeys]) => void;
};

export type TypesKeys = keyof Types;

export type ElectronRender = {
    [K in keyof Types]: (arg: Types[K]) => Promise<TypesReturn[K]>;
  };
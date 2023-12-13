import { ErrorDetail } from "./error";
import { DbInfo, ReceiptAmountNameAttributes, CurrencyNameAttributes, DonorsNameAttributes } from "./sequelizeDBTypes";

//----------IPC INVOKE Angular->INVOKE Electron->RETURN------------------------------//
export type TypesInputInvoke = {
    getSomeData: boolean,
    getDbPath: null,
    getReceiptAmountNames: null,
    getCurrencyNames: null,
    getDonorsNames: null,
}

export type TypesReturnInvoke = {
    getSomeData: number,
    getDbPath: string,
    getReceiptAmountNames: ReceiptAmountNameAttributes[],
    getCurrencyNames: CurrencyNameAttributes[],
    getDonorsNames: DonorsNameAttributes[],
}

export type TypesInputKeysInvoke = keyof TypesInputInvoke;

export type FunctionMapInvoke = {
    [K in keyof TypesInputInvoke]: (arrgument: TypesInputInvoke[TypesInputKeysInvoke]) => Promise<TypesReturnInvoke[K]>;
};

//----------IPC SEND Electron->SEND Angular->ON------------------------------//
export type TypesReturnSend = {
    receiveError: ErrorDetail,
    getDbInfo: DbInfo
}

export type TypesReturnKeysSend = keyof TypesReturnSend;

export type FunctionMapSend = {
    [K in keyof TypesReturnSend]: (callback: (arrgument: TypesReturnSend[K]) => void) => void;
};

//----------IPC ON Angular->SEND Electron->ON------------------------------//

export type TypesSendToMain = {
    sendError: ErrorDetail
}

export type TypesSendKeysToMain = keyof TypesSendToMain;

export type FunctionMapSendToMain = {
    [K in keyof TypesSendToMain]: (arrgument: TypesSendToMain[K]) => void;
};
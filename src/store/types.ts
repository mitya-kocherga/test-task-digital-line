export interface DataRow {
    name: string;
    surname: string;
    age: string;
    city: string;
}
  
export interface RowI extends DataRow {
    id: idType;
}
export type rowKey = keyof DataRow;
export interface Error {
    key: rowKey;
    text: string;
}
export type idType = string;
export interface TableI {
    rows: Array<RowI>;
    readonly isMainTable: boolean;
    id: idType;
}
export interface FormI extends DataRow {
    errors: Error[];
}
  
export interface AppState {
    form: FormI;
    tables: Array<TableI>;
}
  
export type changeHandlerType = {key: rowKey, value: string};
export type errorType = {key: rowKey, text: string | null};
  
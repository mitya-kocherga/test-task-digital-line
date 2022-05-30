import {RootState} from './store';

export const selectForm = (state: RootState) => state.app.form;
export const selectTables = (state: RootState) => state.app.tables;

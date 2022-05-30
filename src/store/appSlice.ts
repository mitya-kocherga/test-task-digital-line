import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import uniqueId  from 'lodash/uniqueId';
import omit  from 'lodash/omit';
import { initialState } from './initialState';
import { changeHandlerType, DataRow, errorType, FormI, idType, RowI, TableI } from './types';
import { EditableRow } from '../components/EditModal/EditModal';


export const counterSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeForm: (state, action: PayloadAction<changeHandlerType>) => {
      state.form[action.payload.key] =  action.payload.value;
    },
    setErrorsForm: (state, action: PayloadAction<errorType>) => {
      if (action.payload.text) {
        state.form.errors.push({key: action.payload.key, text: action.payload.text});
      } else {
        state.form.errors = state.form.errors.filter(err => err.key !== action.payload.key);
      }
    },
    addTableRow: (state) => {
      if (state.form.errors.length > 0) return

      const formValue = {...omit(state.form, 'errors') as FormI, id: uniqueId()};
      state.tables = state.tables.map((t) => {
        if (!t.isMainTable) return t;
        return ({
          ...t,
          rows: [
            ...t.rows,
            formValue
          ]
        })
      });
      state.form = initialState.form;
    },
    copyTable: (state, action: PayloadAction<idType>) => {
      const copiedTable = state.tables.find((i:TableI) => i.id === action.payload)
      state.tables.push({...copiedTable!, id : uniqueId(), isMainTable: false});
    },
    deleteTable: (state, action: PayloadAction<idType>) => {
      state.tables = state.tables.filter(t => t.id !== action.payload);
    },
    editRow: (state, action: PayloadAction<{newRow: DataRow, editableRow: EditableRow | null}>) => {
      if (!action.payload.editableRow) return;
      const {tableId,rowId} = action.payload.editableRow;
      const copiedRow = state.tables.find((i:TableI) => i.id === tableId)!.rows.map((row: RowI) => {
        if (row.id !== rowId) return row
        return {...row, ...action.payload.newRow}
      })
      state.tables = state.tables.map((t:TableI) => {
        if (t.id !== tableId) return t;
        return {...t, rows: copiedRow};
      })
    },
    deleteRow: (state, action: PayloadAction<{id:idType, tableId:idType}>) => {
      state.tables = state.tables.map(t => {
        if (t.id !== action.payload.tableId) return t
        return ({
            ...t,
            rows: t.rows.filter((r) => r.id !== action.payload.id)
          })
      })
    }
  },
});

export const {
  changeForm,
  setErrorsForm,
  copyTable,
  addTableRow,
  deleteRow,
  editRow,
  deleteTable
} = counterSlice.actions;

export default counterSlice.reducer;

import Table from './components/Table/Table';
import Toolbar from './components/Toolbar';
import Form from './components/Form';
import EditModal from './components/EditModal';
import './App.scss';

import {
  changeForm,
  selectForm,
  setErrorsForm,
  selectTables,
  copyTable,
  addTableRow,
  deleteRow,
  deleteTable,
  editRow,
} from './store/appSlice';
import {changeHandlerType, errorType, idType, DataRow} from './store/types';
import {useAppDispatch, useAppSelector} from './store/hooks';
import {Fragment, useState} from 'react';
import {EditableRow} from './components/EditModal/EditModal';

function App() {
  const dispatch = useAppDispatch();
  const formState = useAppSelector(selectForm);
  const tables = useAppSelector(selectTables);

  /* prettier-ignore */ const [editableRow, setEditableRow] = useState<EditableRow|null>(null);

  const formProps = {
    handleSubmit: () => {
      dispatch(addTableRow());
    },
    changeformHandler: (val: changeHandlerType) => {
      dispatch(changeForm(val));
    },
    formState,
    setError: (val: errorType) => {
      dispatch(setErrorsForm(val));
    },
  };

  const addNewTable = (tableId: idType) => () => dispatch(copyTable(tableId));
  const onDeleteTable = (tableId: idType) => () => dispatch(deleteTable(tableId));
  const onEditRowModal = (rowId: idType, tableId: idType) => {
    setEditableRow({rowId, tableId});
  };
  const submitEditRow = (newRow: DataRow) => () => {
    dispatch(editRow({newRow, editableRow}));
    closeModal();
  };
  const closeModal = () => setEditableRow(null);

  const onDeleteRow = (id: idType, tableId: idType) => dispatch(deleteRow({id, tableId}));

  return (
    <div className="App">
      {editableRow && (
        <EditModal
          handleSubmit={submitEditRow}
          editableRow={editableRow}
          closeModal={closeModal}
        />
      )}
      <div className="Forms-work-area">
        <Form {...formProps} />
        <Form {...formProps} variant="two-c" />
      </div>

      <div className="Table-work-area">
        {tables.map((table) => (
          <Fragment key={table.id}>
            <Toolbar
              canDelete={!table.isMainTable}
              onDelete={onDeleteTable(table.id)}
              onAdd={addNewTable(table.id)}
            />
            <Table
              id={table.id}
              rows={table.rows}
              editRow={onEditRowModal}
              deleteRow={onDeleteRow}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default App;

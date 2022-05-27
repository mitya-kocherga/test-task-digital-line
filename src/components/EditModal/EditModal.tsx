import React, {useState} from 'react';
import Form from '../Form';
import Modal from '../Modal';
import {changeHandlerType, DataRow, errorType, idType} from '../../store/types';
import {useAppSelector} from '../../store/hooks';
import {selectTables} from '../../store/appSlice';
import omit from 'lodash/omit';

export interface EditableRow {
  rowId: idType;
  tableId: idType;
}
interface P {
  closeModal: () => void;
  editableRow: EditableRow;
  handleSubmit: (newRow: DataRow) => () => void;
}
function EditModal({
  closeModal,
  editableRow,
  handleSubmit,
  ...rest
}: P): React.ReactElement<P> {
  const tables = useAppSelector(selectTables);
  const rowBasicState = omit(
    tables
      .find((t) => t.id === editableRow.tableId)
      ?.rows.find((r) => r.id === editableRow.rowId),
    'id',
  );
  const [formState, setFormState] = useState({...rowBasicState, errors: []});

  const changeFormHandler = ({key, value}: changeHandlerType) => {
    setFormState((s) => ({
      ...s,
      [key]: value,
    }));
  };
  const setError = ({key, text}: errorType) => {
    //@ts-ignore
    setFormState((s) => ({
      ...s,
      errors: text
        ? [...s.errors, {key, text}]
        : s.errors.filter((err: errorType) => err.key !== key),
    }));
  };

  return (
    <Modal closeModal={closeModal}>
      <Form
        handleSubmit={handleSubmit(omit(formState, 'errors'))}
        changeformHandler={changeFormHandler}
        formState={formState}
        setError={setError}
      />
    </Modal>
  );
}

export default EditModal;

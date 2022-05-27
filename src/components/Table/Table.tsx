import {idType, RowI} from '../../store/types';
import {LinkButton} from '../Buttons';
import TableHeaderComponent from './TableHeader';

interface P {
  rows: Array<RowI>;
  editRow: (id: idType, tableId: idType) => void;
  deleteRow: (id: idType, tableId: idType) => void;
  id: idType;
}
function TableComponent({
  rows,
  editRow,
  deleteRow,
  id: tableId,
}: P): React.ReactElement<P> {
  const onEditRow = (id: idType) => () => editRow(id, tableId);
  const onDeleteRow = (id: idType) => () => deleteRow(id, tableId);

  return (
    <div className="table-component">
      <table className="table-component__table table">
        <TableHeaderComponent />
        <tbody>
          {rows.map(({name, surname, age, city, id: rowId}) => (
            <tr className="table__row" key={rowId}>
              <td className="table__cell">{name}</td>
              <td className="table__cell">{surname}</td>
              <td className="table__cell">{age}</td>
              <td className="table__cell">{city}</td>
              <td className="table__cell">
                <div className="table-component__toolbar-container">
                  <LinkButton onClickHandler={onEditRow(rowId)} text="Edit" />
                  <LinkButton
                    onClickHandler={onDeleteRow(rowId)}
                    text="Delete"
                    variant="dangerous"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableComponent;

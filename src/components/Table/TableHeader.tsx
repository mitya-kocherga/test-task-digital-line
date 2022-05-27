function TableHeaderComponent() {
  return (
    <thead className="table__header">
      <tr className="table-component__row">
        <th className="table__cell">Name</th>
        <th className="table__cell">Surname</th>
        <th className="table__cell">Age</th>
        <th className="table__cell">City</th>
        <th className="table__cell"></th>
      </tr>
    </thead>
  );
}

export default TableHeaderComponent;

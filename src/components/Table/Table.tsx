import React from 'react';
import { Column, useTable } from 'react-table';
import './table.css'


interface Data {
  id: number; //id працівника
  name: string; // ПІБ працівника
  type: "d" | "n"; // тип зміни бути тільки "d" - денна або "n" - нічна
  arrival: string; // прихід
  departure: string; // ухід
  duration: string; // тривалість зміни
  total: string; // час, який зараховується
}

interface Props {
  data: Data[];
}

const Table: React.FC<Props> = ({ data }) => {
  const columns: Column<Data>[] = React.useMemo(
    () => [
      {
        Header: 'Співробітник',
        accessor: 'name',
        className: 'name-cell',
      },
      {
        Header: 'Д/H',
        accessor: 'type',
        Cell: ({ value }: { value: string }) => (value === 'd' ? 'Д' : 'Н'),
        className: 'type-cell',
      },
      {
        Header: 'Прихід',
        accessor: 'arrival',
        className: 'arrival-cell',
      },
      {
        Header: 'Ухід',
        accessor: 'departure',
        className: 'departure-cell',
      },
      {
        Header: 'Трив.',
        accessor: 'duration',
        className: 'duration-cell',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className='container table'>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} className='thead'>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className='tbody'>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} className={cell.column.className}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

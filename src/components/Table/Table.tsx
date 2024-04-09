import React from 'react';
import { Column,useTable } from 'react-table';


interface Data {
  name: string;
  type: string;
  arrival: string;
  departure: string;
  duration: string;
  total: string;
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
      },
      {
        Header: 'День/ніч',
        accessor: 'type' ,
        Cell: ({value}: {value: string}) => (value === 'd' ? 'Д' : 'Н'),
      },
      {
        Header: 'Прихід',
        accessor: 'arrival',
      },
      {
        Header: 'Ухід',
        accessor: 'departure',
      },
      {
        Header: 'Тривалість',
        accessor: 'duration',
      },
      {
        Header: 'Всього',
        accessor: 'total',
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
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

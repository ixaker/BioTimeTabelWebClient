import React from 'react';
import { Column, useTable } from 'react-table';
import './table.css';
import { useAppContext } from '../../State/AppProvider';

interface Data {
  id: number;
  name: string;
  type: 'd' | 'n';
  arrival: string;
  departure: string;
  duration: string;
  total: string;
}

type CustomColumn<Data extends object = object> = Column<Data> & {
  className?: string;
};

interface Props {
  selectedId: number | null;
}

const Table: React.FC<Props> = ({selectedId}) => {
  console.log('Table start');
  const { state } = useAppContext();
  const data = state.data;
  
  const columns: CustomColumn<Data>[] = React.useMemo(
    () => [
      {
        Header: 'Співробітник',
        accessor: 'name',
        className: 'name-cell',
      },
      {
        Header: 'З',
        accessor: 'type',
        Cell: ({ value }: { value: string }) => (value === 'd' ? 'Д' : 'Н'),
        className: 'type-cell',
      },
      {
        Header: 'Прих.',
        accessor: 'arrival',
        className: 'arrival-cell',
      },
      {
        Header: 'Уход',
        accessor: 'departure',
        className: 'departure-cell',
      },
      {
        Header: 'Трив.',
        accessor: 'duration',
        className: 'duration-cell',
      },
      {
        Header: 'Всього',
        accessor: 'total',
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
          const tdClassName = row.original.id === selectedId ? 'highlight' : '';
          return (
            <tr {...row.getRowProps()} >
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} className={tdClassName}>{cell.render('Cell') } </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;


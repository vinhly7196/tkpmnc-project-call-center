import React, { useMemo, useState } from 'react'
import { TRIPS_COLUMNS } from './TripColumns'
import './table.css'
import { useTable, useFilters, useGlobalFilter } from 'react-table'
import { TRIP_STATUS } from './Constant'
import { ColumnFilter } from './ColumnFilter'


const TripList = ({trips }) => {
    const columns = useMemo(() => TRIPS_COLUMNS, [])

    //   filter trip from call-center
    const trips_call_center = trips.filter(function (el) 
    {
        return (el.request_from === "call-center" && TRIP_STATUS.includes(el.status))
    });
    const [data, setData] = useState(trips_call_center);

    const initialState = { hiddenColumns: ['id'] };

    const defaultColumn = React.useMemo(
        () => ({
          Filter: ColumnFilter
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data,
        defaultColumn,
        initialState
        },
        useFilters,
)

    return (
        <>
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row)
                return (
                <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}                    
                </tr>
                )
            })}
            </tbody>

        </table>
        </>
    )
};

export default TripList;
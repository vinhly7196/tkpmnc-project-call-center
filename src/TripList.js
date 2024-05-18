import React, { useMemo, useEffect, useState } from 'react'
import { TRIPS_COLUMNS } from './TripColumns'
import './table.css'
import { useTable, useFilters, useGlobalFilter } from 'react-table'
import VehicleDetailLink from './VehicleDetailsLink';


const TripList = ({ trips }) => {
    const columns = useMemo(() => TRIPS_COLUMNS, [])

    //   filter trip from call-center
    const trips_call_center = trips.filter(function (el) 
    {
        return el.request_from == "call-center"
    });
    const [data, setData] = useState(trips_call_center);

    const initialState = { hiddenColumns: ['id'] };
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data,
        initialState
    })

    return (
        <>
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
                prepareRow(row)
                return (
                <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}

                    {/* <td>
                    <TripDetailLink trip_id={row.original.id} />
                    </td> */}
                </tr>

                )
            })}
            </tbody>

        </table>
        </>
    )
};

export default TripList;
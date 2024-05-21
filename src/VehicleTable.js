import React, { useMemo, useEffect, useState } from 'react'
import { COLUMNS } from './columns'
import './table.css'
import { useTable, useFilters, useGlobalFilter } from 'react-table'
import VehicleDetailLink from './VehicleDetailsLink';
import { ColumnFilter } from './ColumnFilter'


const VehicleTable =  () => {
  const columns = useMemo(() => COLUMNS, [])
  const [data, setData] = useState([]);
  const search = {"verified": false}
  // get data 
  useEffect(() => {
    async function search_vehicle(key) {
      const res = await fetch('http://209.38.168.38/vehicle/search', {
        method: 'POST',
        headers: { 
          "Content-Type": "application/json", 
          'Accept': 'application/json',
        },
        body: JSON.stringify(key)
      })
      const dataJS = await res.json()
      setData(dataJS)
    } 
    search_vehicle(search);
 }, [])

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
    defaultColumn
  }, useFilters,)

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

                <td>
                  <VehicleDetailLink VehicleNumber={row.original.vehicle_number} />
                </td>
              </tr>

            )
          })}
        </tbody>

      </table>
    </>
  )
}

export default VehicleTable;
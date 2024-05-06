import React, { useMemo, useEffect, useState } from 'react'
import { COLUMNS } from './columns'
import './table.css'
import { useTable, useFilters, useGlobalFilter } from 'react-table'
// import {Link} from 'react-router-dom';

const VehicleTable =  () => {
  const columns = useMemo(() => COLUMNS, [])
  const [data, setData] = useState([]);
  const search = {}
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
      const data_unverified_vehicles = []
      dataJS.forEach(e => {
        if (!e.verified)
        {
          data_unverified_vehicles.push(e)
        }
      });
      setData(data_unverified_vehicles)
    } 
    search_vehicle(search);
 }, [])
  

  ;
  // const data = useMemo(() => dataJS, [])
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
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
                  <Link to={`/`}>
                          <h2>{row.original.age}</h2>
                          </Link> 
                </td> */}
              </tr>

            )
          })}
        </tbody>

      </table>
    </>
  )
}

export default VehicleTable;
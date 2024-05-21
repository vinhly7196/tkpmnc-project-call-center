
import {Link} from 'react-router-dom';
export const TRIPS_COLUMNS = [
  {
    Header: 'Trip ID',
    accessor: 'id',
    show: false
  },
  {
    Header: 'Customer',
    accessor: 'customer.name',
    disableFilters: true
  },
  {
    Header: 'Customer Phone',
    accessor: 'customer.phone'
    
  },
  {
    Header: 'Pickup',
    accessor: 'pickup.address',
    disableFilters: true
  },
  {
    Header: 'Destination',
    accessor: 'destination.address',
    disableFilters: true
  },
  {
    Header: 'Driver',
    accessor: 'driver.name',
    disableFilters: true
  },
  {
    Header: 'Driver phone',
    accessor: 'driver.phone',
    disableFilters: true
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ row }) => {
      return <Link to={`/TripDetails/${row.original.id}`}>{row.original.status}</Link> 
    }
  }
]

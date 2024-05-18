
import {Link} from 'react-router-dom';

export const TRIPS_COLUMNS = [
  {
    Header: 'Trip ID',
    accessor: 'id',
    show: false
  },
  {
    Header: 'Customer',
    accessor: 'customer.name'
  },
  {
    Header: 'Customer Phone',
    accessor: 'customer.phone'
  },
  {
    Header: 'Pickup',
    accessor: 'pickup.address'
  },
  {
    Header: 'Destination',
    accessor: 'destination.address'
  },
  {
    Header: 'Driver',
    accessor: 'driver.name'
  },
  {
    Header: 'Driver phone',
    accessor: 'driver.phone'
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ row }) => {
      return <Link to={`/TripDetails/${row.original.id}`}>{row.original.status}</Link> 
    }
  }
]

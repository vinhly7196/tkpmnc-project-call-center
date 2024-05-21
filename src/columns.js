

export const COLUMNS = [
  {
    Header: 'Vehicle Number',
    accessor: 'vehicle_number',
    
  },
  {
    Header: 'Model',
    accessor: 'model',
    disableFilters: true
  },
  {
    Header: 'Type',
    accessor: 'vehicle_type.name',
    disableFilters: true
  }
  ,
  {
    Header: 'Doc Status',
    accessor: 'document_fid',
    disableFilters: true,
    Cell: ({ value }) => {
    if (value != null)
    {
      return <span>&#10003;</span>
    }
  }

  }
]
// "verified": true,
// "document_fid": "66325b99112bb65ae09f437c"
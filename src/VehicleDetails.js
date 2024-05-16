import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import React, { useMemo, useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'

const VehicleDetails = () => {
    const { number } = useParams();
    // const {data: vehicle, error, isPending } = useFetch('http://209.38.168.38/vehicle/' + number);
    const [vehicle, setData] = useState('')
    const [drivers, setDrivers] = useState([])
    const [doc, setDoc] = useState()
    const [verify_stt, setVerifyStt] = useState('')
    

    // get data 
    useEffect(() => {
        async function search_vehicle(num) 
        {
            const res = await fetch('http://209.38.168.38/vehicle/' + num)
            const dataJS = await res.json()
            setData(dataJS)
            setDrivers(dataJS.drivers)

            if (dataJS.document_fid !== null)
            {
              // download document
              const doc_res = await fetch('http://209.38.168.38/vehicle/download-document/' + dataJS.document_fid, {
                method: 'POST',
                // headers: { 
                //   // "Content-Type": 'image/png',
                //   // "Content-Disposition": attachment; filename="picture.png"
                // },
                // body: JSON.stringify({})
              })

              const docJS = await doc_res.blob()
              const img = URL.createObjectURL(docJS); 
              setDoc(img)
            }
            
        } 
        search_vehicle(number)
    }, [])

    async function verify ()
    {

      // kiem tra document existed
      if (vehicle.document_fid === null)
      {
        return setVerifyStt('no_doc')
      }

      // post api
      const res = await fetch('http://209.38.168.38/vehicle/verify-document/' + vehicle.vehicle_number, {
        method: 'POST',
        headers: { 
          "Content-Type": "application/json", 
          'Accept': 'application/json',
        },
        body: JSON.stringify({})
      })

      // result 
      const verify_res = await res.json()
      setVerifyStt(verify_res.status)
    }

    const driverItem = drivers.map(driver => 
        <tr>
            <td>{driver.name}</td>
            <td>{driver.phone}</td>
        </tr>
    )

      return (
        <div className="vehicle-details">
          
          <h2>Vehicle {vehicle.vehicle_number}</h2>
          
          <table>

            <tr>
                <td>Make</td>
                <td>{vehicle.make}</td>
            </tr>
            <tr>
                <td>Model</td>
                <td>{vehicle.model}</td>
            </tr>

            <tr>
                <td>Type</td>
                <td>{vehicle?.vehicle_type?.name}</td>
            </tr>

            </table>

            <h2>{drivers.length} Drivers</h2>
            <table>
                {driverItem}
            </table>

            
            {vehicle.document_fid !== null && <h2>Document</h2>}
            {vehicle.document_fid !== null && <img src={doc} />}
              
            {verify_stt !== "ok" &&  
               <Button colorScheme='pink'  onClick={verify}>
                Verify Information
                </Button>
            }

            {verify_stt === "ok" && <div> Verify Successfully!</div>}
            {verify_stt === "no_doc" && <div> Can not verify without Document</div>}

        </div>
            
        
      );
    
}

export default VehicleDetails;
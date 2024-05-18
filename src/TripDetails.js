import { useHistory,useParams } from "react-router-dom";
import useFetch from "./useFetch";
import React, { useMemo, useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'

const TripDetails = () => {
    const { trip_id } = useParams()
    const [trip, setTrip] = useState()
    // const [customer_name, setCustomerName] = useState('')
    // const [phone, setPhone] = useState('')
    // const [destAddress, setDestAddress] = useState('')
    // const [dest_lng, setDestLng] = useState('')
    // const [dest_lat, setDestLat] = useState('')
    // const [pickupAddress, setPickupAddress] = useState('')
    // const [pickup_lng, setPickupLng] = useState('')
    // const [pickup_lat, setPickupLat] = useState('')
    // const [price, setPrice] = useState()
    // const [request_time, setRequestTime] = useState('')
    // const [request_type, setRequestType] = useState('')
    // const [vehicle_type, setVehicleType] = useState('')


    const customer = {
        id: "",
        name: trip?.customer?.name,
        phone: trip?.customer?.phone,
        rank: "NORMAL",
        type: "customer"
    }
    
    const destination = {
        address: trip?.destination?.address,
        coordinate: [
            trip?.destination?.coordinate[0],
            trip?.destination?.coordinate[1]
        ]
    }
    
    const pickup = {
        address: trip?.pickup?.address,
        coordinate: [
            trip?.pickup?.coordinate[0],
            trip?.pickup?.coordinate[1]
        ]
    }
    
    const requester = {
        "id": "C001",
        "name": "Employee1",
        "phone": "0987364736",
        "rank": "NORMAL",
        "type": "operator"
    }
    
    const trip_book = {
        additional_services: [],
        customer,
        destination,
        distance: trip?.distance,
        id: trip_id,
        payment_method: trip?.payment_method,
        pickup,
        price: trip?.price,
        request_time: trip?.request_time,
        request_type: trip?.request_type,
        requester,
        vehicle_type: trip?.vehicle_type
    };
    
    
    // get data 
    useEffect(() => {
        async function search_trip(trip_id) 
        {
            const res = await fetch('http://209.38.168.38/trip/get/' + trip_id)
            const data = await res.json()
            setTrip(data)
        } 
        search_trip(trip_id)
    }, [])

    

    async function rebook ()
    {
        console.log(trip_book)
        fetch('http://209.38.168.38/trip/customer/book/call-center', {
        method: 'POST',
        
        headers: { 
            "Content-Type": "application/json", 
            'Accept': 'application/json',
        },
    
        body: JSON.stringify(trip_book)
        
        })
        .then((res) => { return res.json() })
        .then(tripBooked => {
        console.log(tripBooked)
        })
    }

    


    return (
        <div className="trip-details">
          
        <h2>Trip {trip_id}</h2>
        
        <table>

          <tr>
              <td>Customer</td>
              <td>{customer.name}</td>
          </tr>
          <tr>
              <td>Phone</td>
              <td>{customer.phone}</td>
          </tr>
          <tr>
              <td>Pickup</td>
              <td>{pickup.address}</td>
          </tr>
          <tr>
              <td>Destination</td>
              <td>{destination.address}</td>
          </tr>

          <tr>
              <td>Price</td>
              <td>{trip?.price}</td>
          </tr>

          <tr>
              <td>Request Type</td>
              <td>{trip?.request_type}</td>
          </tr>
          <tr>
              <td>Request Time</td>
              <td>{trip?.request_time}</td>
          </tr>

          </table>
          
            

        <Button colorScheme='pink'  onClick={rebook}>
        Re Book
        </Button>


      </div>
    );
}

export default TripDetails;
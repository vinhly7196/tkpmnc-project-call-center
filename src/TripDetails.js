import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'
import dateFormat from "dateformat";
import { GET_TRIP_API, POST_BOOK_TRIP } from './Constant'
import {Link} from 'react-router-dom';
import { FaCarSide } from "react-icons/fa";


const TripDetails = () => {
    const { trip_id } = useParams()
    const [trip, setTrip] = useState()
    const [trip_booked, setTripBook] = useState()
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
    
    const date = dateFormat(trip?.request_time, "dddd, dS mmmm, yyyy, h:MM:ss TT");
    const price_show = trip?.price.toLocaleString('en-US', {style : 'currency', currency : 'VND'});
    // get data 
    useEffect(() => {
        async function search_trip(trip_id) 
        {
            const res = await fetch(GET_TRIP_API(trip_id))
            const data = await res.json()
            setTrip(data)
        } 
        search_trip(trip_id)
    }, [])

    

    async function rebook ()
    {
        console.log(trip_book)
        fetch(
            POST_BOOK_TRIP, 
            {
                method: 'POST',
                
                headers: 
                { 
                    "Content-Type": "application/json", 
                    'Accept': 'application/json',
                },
                body: JSON.stringify(trip_book)
            }
        )
        .then((res) => { return res.json() })
        .then( tripBooked => {
            setTripBook(tripBooked)
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
              <td>{price_show}</td>
          </tr>

          <tr>
              <td>Request Type</td>
              <td>{trip?.request_type}</td>
          </tr>
          <tr>
              <td>Request Time</td>
              <td>{date}</td>
          </tr>

          <tr>
              <td>Status</td>
              <td>{trip?.status}</td>
          </tr> 

          </table>
          
            

        <Button colorScheme='pink'  onClick={rebook}>
        Re Book
        </Button>

        {trip_booked && 
            <Link to={`/TripDetails/${trip_book.id}`}>Booked Successfully! <FaCarSide /></Link> 
        }

      </div>
    );
}

export default TripDetails;
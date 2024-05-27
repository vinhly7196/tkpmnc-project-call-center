import { useState } from "react";
import { useHistory } from "react-router-dom";
import Map from "./Map";
import useFetch from "./useFetch";
import Datetime from 'react-datetime';
import {Link} from 'react-router-dom';
import { POST_BOOK_TRIP, GET_VEHICILE_TYPES } from './Constant'
import { FaCarSide } from "react-icons/fa";
import { FcCustomerSupport } from "react-icons/fc";
import { FaSquarePhone } from "react-icons/fa6";
import { RiEBike2Fill } from "react-icons/ri";
import { FcManager } from "react-icons/fc";
import { RiCalendarScheduleFill } from "react-icons/ri";
const Create = () => {
  const [customer_name, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [destinationField, setDestination] = useState('');
  const [type, setType] = useState('');
  const [distance, setDistance] = useState('')

  const [origin, setOrigin] = useState({
    lat: 10.773599,
    lng: 106.694420,
  });

  const [oriAddress, setOriAddress] = useState('');
  const [destAddress, setDestAddress] = useState('');

  const request_type_default = "ORDINARY"
  const [requestType, setRequestType] = useState(request_type_default);
  let   [requestTime, setRequestTime] = useState(new Date());
  const [price, setPrice] = useState('');
  const [tripId, setTripId] = useState('');
  const history = useHistory();
  
  const vehicle_type_default = "660a1d500f484db6e0970db4"
  const [vehicle_type, setVehicleType] = useState(vehicle_type_default);
  const [trip_booked, setTripBook] = useState()

  const {data: carType, error, isPending } = useFetch(GET_VEHICILE_TYPES);

  console.log(carType)
  // set field to call api
  const customer = {
    id: "102",
    name: customer_name,
    phone: phone,
    rank: "NORMAL",
    type: "customer"
  }

  const destination = {
    address: destAddress,
    coordinate: [
      destinationField.lng,
      destinationField.lat
    ]
  }

  const pickup = {
    address: oriAddress,
    coordinate: [
      origin.lng,
      origin.lat
    ]
  }

  const requester = {
    "id": "C001",
    "name": "Nguyen Van A",
    "phone": "0987364736",
    "rank": "NORMAL",
    "type": "operator"
  }

  const trip_estimate = {
    customer,
    destination,
    distance: distance,
    pickup,
    request_type: request_type_default,
    vehicle_type: vehicle_type
  };

  // set rule for request time only for schedule
  if (requestType == "ORDINARY")
  {
    requestTime = new Date();
  }

  const trip_book = {
    additional_services: [],
    customer,
    destination,
    distance: distance,
    id: tripId,
    payment_method: "cash",
    pickup,
    price: price,
    request_time: requestTime,
    request_type: requestType,
    requester,
    vehicle_type: vehicle_type
  };
  const price_show = price.toLocaleString('en-US', {style : 'currency', currency : 'VND'});
  
  
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(POST_BOOK_TRIP, {
      method: 'POST',
      headers: { 
        "Content-Type": "application/json", 
        'Accept': 'application/json',
      },

      body: JSON.stringify(trip_book)
    })
    .then((res) => { return res.json() })
    .then(tripBooked => {
      setTripBook(tripBooked)
    })
  }

  return (
    <div className="create">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { carType && 
      <div>
      <h2><FcCustomerSupport />Add a New Trip</h2>
      <form onSubmit={handleSubmit}>
        <label><FcManager />Customer:</label>
        <input 
          type="text" 
          required 
          value={customer_name}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <label><FaSquarePhone />Phone:</label>
        <input
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        ></input>   

        <label><RiEBike2Fill />Vehicle Type:</label>
        <select
          value={vehicle_type}
          onChange={(e) => setVehicleType(e.target.value)}
        >
          {
          carType.map((type) => (
            <option value={type._id}>{type.name}</option>
          ))
          }
        </select>

        <label><RiCalendarScheduleFill />Request Type</label>
        <select
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
        >
          <option value="ORDINARY">ORDINARY</option>
          <option value="SCHEDULED">SCHEDULED</option>
        </select>

        <Datetime 
          value={requestTime}
          onChange={setRequestTime}
        />

        <Map setOrigin={setOrigin}  
        setDestination={setDestination} 
        setDestAddress={setDestAddress} 
        setOriAddress={setOriAddress} 
        setDistance={setDistance}
        setTripId={setTripId}
        setPrice={setPrice}
        trip_estimate={trip_estimate}
        />

        <div className="price">
              { price_show && <div>Price: {price_show} VND</div> }
            </div>
        <button>Book</button>
      </form>
      </div>
        }

        {trip_booked && 
        <Link to={`/TripDetails/${trip_book.id}`}>Booked Successfully! <FaCarSide /></Link> 
        }
    </div>
  );
}
 
export default Create;
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Map from "./Map";
import useFetch from "./useFetch";
import CarTypePicker from "./CarTypePicker";
import Datetime from 'react-datetime';



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
  const [requestType, setRequestType] = useState('ORDINARY');
  let [requestTime, setRequestTime] = useState(new Date());
  const [price, setPrice] = useState('');
  const [tripId, setTripId] = useState('');
  const history = useHistory();
  const [vehicle_type, setVehicleType] = useState('');

  const {data: carType, error, isPending } = useFetch('http://209.38.168.38/vehicle/vehicle-types');

  console.log(carType)
  // set field to call api
  const customer = {
    id: "",
    name: customer_name,
    phone: phone,
    rank: "NORMAL",
    type: "customer"
  }

  const destination = {
    address: destAddress,
    coordinate: [
      destinationField.lat,
      destinationField.lng
    ]
  }

  const pickup = {
    address: oriAddress,
    coordinate: [
      origin.lat,
      origin.lng
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
    request_type: "ORDINARY",
    vehicle_type: "1"
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
    id: "66252f77b3ce84711ae5bd80",
    pickup,
    price: price,
    request_time: requestTime,
    request_type: requestType,
    requester,
    vehicle_type: vehicle_type
  };

  
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // function to estimate price

    fetch('https://refactored-goldfish-wgvwrr4wqjf5p74-8080.app.github.dev/api/v1/book/call-center', {
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
    <div className="create">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { carType && 
      <div>
      <h2>Add a New Trip</h2>
      <form onSubmit={handleSubmit}>
        <label>Customer:</label>
        <input 
          type="text" 
          required 
          value={customer_name}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <label>Phone:</label>
        <input
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        ></input>   

        <label>Vehicle Type:</label>
        <select
          value={vehicle_type}
          onChange={(e) => setVehicleType(e.target.value)}
        >
          {
          carType.map((type) => (
            <option value={type.id}>{type.name}</option>
          ))
          }
        </select>

        <label>Request Type</label>
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
              { price && <div>Price: {price} VND</div> }
            </div>
        <button>Book</button>
      </form>
      </div>
        }
    </div>
  );
}
 
export default Create;
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Map from "./Map";
import useFetch from "./useFetch";
import CarTypePicker from "./CarTypePicker";



const Create = () => {
  const [customer_name, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('');
  const [type, setType] = useState('');

  const [origin, setOrigin] = useState({
    lat: 10.773599,
    lng: 106.694420,
  });

  const [oriAddress, setOriAddress] = useState('');
  const [destAddress, setDestAddress] = useState('');
  const history = useHistory();

  // const {data: carType, error, isPending } = useFetch('https://effective-space-couscous-7rrrrqrv6g9hp9vx-8000.app.github.dev/cartypes');

  
  const handleSubmit = (e) => {
    e.preventDefault();
    // const trip = { customer_name, origin, phone, destination };
    // console.log(trip)

    const trip = 
    {
      "customer": {
        "id": "",
        "name": customer_name,
        "phone": phone,
        "score": 0,
        "type": "customer"
      },
      "destination": {
        "address": destAddress,
        "coordinate": [
          destination.lat,
          destination.lng
        ]
      },
      "pickup": {
        "address": oriAddress,
        "coordinate": [
          origin.lat,
          origin.lng
        ]
      },
      "requester": {
        "id": "",
        "name": "John Doe",
        "phone": "555-123-4567",
        "score": 3,
        "type": "call-center"
      },
      "vehicle_type": "1"
    }

    

    fetch('https://verbose-journey-x999969r5g6f6jq4-8080.app.github.dev/api/v1/book/call-center', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trip)
    })
    .then((response) => {
      return response.json()["trip_created"]
    })
    .then((tripid) => {
      async function fetchTrip() {
        const res = await fetch(`https://verbose-journey-x999969r5g6f6jq4-8080.app.github.dev/api/v1/check-booking/${trip_id}`)  
        const tripResult = await res.json();
        return tripResult;   
      }

      fetchTrip().then(
        (tripResult) => {
          if (tripResult.result != "END") {
            console.log(tripResult);
          }
        }
      )
      

    })
  }



  return (
    <div className="create">
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

        <label>Type:</label>
        {/* <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {
            carType.map((ct) => (
              <option value="">{ct.name}</option>
            ))
          }
        </select> */}

        <label>Chọn nơi đón / điểm đến</label>
        <Map setOrigin={setOrigin}  setDestination={setDestination} setDestAddress={setDestAddress} setOriAddress={setOriAddress}/>
        
        <button>Book</button>
      </form>
    </div>
  );
}
 
export default Create;
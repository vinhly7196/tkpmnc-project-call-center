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

  const history = useHistory();

  // const {data: carType, error, isPending } = useFetch('https://effective-space-couscous-7rrrrqrv6g9hp9vx-8000.app.github.dev/cartypes');

  const [origin, setOrigin] = useState({
    lat: 10.773599,
    lng: 106.694420,
  });



  const handleSubmit = (e) => {
    e.preventDefault();
    const trip = { customer_name, origin, phone, destination };
    console.log(trip)

    // fetch('http://localhost:8000/blogs/', {
    //   method: 'POST',
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(trip)
    // }).then(() => {
    //   // history.go(-1);
    //   history.push('/');
    // })
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

        <label>Chọn nơi đón / trả khách</label>
        <Map setOrigin={setOrigin}  setDestination={setDestination}/>
        
        <button>Book</button>
      </form>
    </div>
  );
}
 
export default Create;
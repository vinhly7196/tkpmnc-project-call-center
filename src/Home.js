
import { useEffect, useState } from "react"
import TripList from "./TripList"
import { GET_ALL_TRIP_API } from './Constant'
import axios from 'axios';

const Home = () => {
  const [trips, setTrips] = useState([])
  
  async function callApi() {    
      const res = await fetch(GET_ALL_TRIP_API)
      const data = await res.json()
      setTrips(data)
  };
  useEffect(() => {
    // const getChargersData = () => {
    //   callApi();
    // }

    const getChargersData = () => {
      axios.get(GET_ALL_TRIP_API)
        .then(res => {
          setTrips(res.data);
        })
        console.log("read api")
    }
    getChargersData()

    const interval = setInterval(() => {
      getChargersData()
    }, 5 * 1000);
    return () => clearInterval(interval);
  },[trips]);


  return (
    <div className="home">
      { trips && <TripList trips={trips} key={trips} /> } 
    </div>
  );
}
 
export default Home;





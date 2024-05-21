import useFetch from "./useFetch";
import { getMessaging, onMessage } from "firebase/messaging";
import { generateToken , messaging } from './firebase';
import { useEffect, useState } from "react"
import TripList from "./TripList"
import { GET_ALL_TRIP_API } from './Constant'

const Home = () => {
  const [trips, setTrips] = useState()

  async function callApi() {    
      const res = await fetch(GET_ALL_TRIP_API)
      const data = await res.json()
      setTrips(data)
  };
  useEffect(() => {
    const getChargersData = () => {
      callApi();
    }

    getChargersData()

    const interval = setInterval(() => {
      getChargersData()
    }, 45 * 1000);
    return () => clearInterval(interval);
  },[]);


  return (
    <div className="home">
      { trips && <TripList trips={trips} key={trips} /> } 
    </div>
  );
}
 
export default Home;





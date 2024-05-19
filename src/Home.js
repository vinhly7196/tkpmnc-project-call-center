import useFetch from "./useFetch";
import { getMessaging, onMessage } from "firebase/messaging";
import { generateToken , messaging } from './firebase';
import { useEffect, useState } from "react"
import TripList from "./TripList"
import axios from 'axios';
import { GET_ALL_TRIP_API } from './Constant'

const Home = () => {
  const [trips, setTrips] = useState()
  // const { error, isPending, data: trips } = useFetch('http://209.38.168.38/trip/get')

  async function callApi() {
    
      const res = await fetch(GET_ALL_TRIP_API)
      const data = await res.json()
      setTrips(data)
      
  };
  
  useEffect(() => {
    let timerId = setInterval(() => {
      callApi();
    }, 60 * 1000);

    return () => {
      clearInterval(timerId)
    }
  },[trips]);


  return (
    <div className="home">
      {/* { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> } */}
      { trips && <TripList trips={trips} key={trips} /> } 
      {/* { trips[0].id }  */}


    </div>
  );
}
 
export default Home;





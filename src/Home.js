import useFetch from "./useFetch";
import { getMessaging, onMessage } from "firebase/messaging";
import { generateToken , messaging } from './firebase';
import { useEffect } from "react"
import TripList from "./TripList"

const Home = () => {
  const { error, isPending, data: trips } = useFetch('http://209.38.168.38/trip/get')

  // useEffect(() => {
  //   generateToken()
  //   onMessage(messaging, (payload) => {
  //     console.log('Message received. ', payload);
  //     // ...
  //   });
  // }, []);

  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { trips && <TripList trips={trips} /> }


    </div>
  );
}
 
export default Home;





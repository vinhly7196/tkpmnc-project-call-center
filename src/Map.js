import React from "react";
import { useState, useRef } from "react";
import { GoogleMap, useLoadScript, MarkerF, DirectionsRenderer, Autocomplete } from "@react-google-maps/api";
import { REACT_APP_GOOGLE_MAPS_KEY } from "./Constant";
import axios from 'axios';

// import Autocomplete from "react-google-autocomplete";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from '@chakra-ui/react'


const getLatLngFromPlaceId = async (placeId) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        place_id: placeId,
        key: REACT_APP_GOOGLE_MAPS_KEY,
      },
    });

    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location;
      const latLng = {
        lat: location.lat,
        lng: location.lng,
      };
      return latLng;
    } else {
      console.error('Geocoding API request failed:', response.data.status);
      return null;
    }
  } catch (error) {
    console.error('Error in geocoding request:', error.message);
    return null;
  }
};

const MapComponent = ({ setOrigin, setDestination, setOriAddress, setDestAddress, setDistance,setTripId, setPrice, trip_estimate  }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_KEY,
    libraries: ['places'],
  });
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const [map, setMap] = useState(null)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  // const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const originRef = useRef()
  const destiantionRef = useRef()
  // const [price, setPrice] = useState('')


  const [source, setSource] = useState({
    lat: 10.773599,
    lng: 106.694420,
  });



  if (loadError) return "Error";
  if (!isLoaded) return "Maps";

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })

    setDirectionsResponse(results);
    // setDistance(results.routes[0].legs[0].distance.text)
    setDistance(parseFloat(results.routes[0].legs[0].distance.value) / 1000)
    setDuration(results.routes[0].legs[0].duration.text)

    // get origin and destination
    let origin = await getLatLngFromPlaceId(results.geocoded_waypoints[0].place_id)
    let destination = await getLatLngFromPlaceId(results.geocoded_waypoints[1].place_id)
    

    // update value to return to call api later
    setOrigin(origin)
    setDestination(destination)
    setOriAddress(originRef.current.value)
    setDestAddress(destiantionRef.current.value)

    // update trip_estimate
    trip_estimate.distance = parseFloat(results.routes[0].legs[0].distance.value) / 1000
    trip_estimate.pickup.coordinate[0] = origin.lat
    trip_estimate.pickup.coordinate[1] = origin.lng
    trip_estimate.destination.coordinate[0] = destination.lat
    trip_estimate.destination.coordinate[1] = destination.lng
    trip_estimate.pickup.address = originRef.current.value
    trip_estimate.destination.address = destiantionRef.current.value

    // call api to estimate price
    const res = await fetch('https://refactored-goldfish-wgvwrr4wqjf5p74-8080.app.github.dev/api/v1/estimate/call-center', {
      method: 'POST',
      
      headers: { 
        "Content-Type": "application/json", 
        'Accept': 'application/json',
      },

      body: JSON.stringify(trip_estimate)
    })

    const tripEstimated = await res.json();
    setPrice(tripEstimated.result);
    setTripId(tripEstimated.trip_id);

  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  return (

    <div style={{ marginTop: "50px" }}>
      <label>Add Pickup / Destination</label>
      <Autocomplete 
      restrictions={{ country: "VN" }}
      >
        <Input 
        type='text' 
        placeholder='Nơi đón khách' 
        ref={originRef} 
        // onChange={(e) => setOriAddress(e.target.value)}
        />
      </Autocomplete>

      <Autocomplete restrictions={{ country: "VN" }}>
              <Input
                type='text'
                placeholder='Nơi trả khách'
                ref={destiantionRef}
                // onChange={(e) => setDestAddress(e.target.value)}
              />
      </Autocomplete>


      <GoogleMap
        mapContainerStyle={{
          height: "400px",
        }}
        center={source}
        zoom={13}
        // onLoad={onMapLoad}
        onLoad={map => setMap(map)}
        
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        >
        <MarkerF
          position={source}
          icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
        />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}



      </GoogleMap>
      <ButtonGroup>
        <Button colorScheme='pink'  onClick={calculateRoute}>
          Confirm Information
        </Button>

        <IconButton
              aria-label='center back'
              onClick={clearRoute}
            />
        <br/>
        {/* <div className="price">
              { price && <div>Price: {price} VND</div> }
            </div> */}

      </ButtonGroup>
    </div>
  );

    
};

export default MapComponent;
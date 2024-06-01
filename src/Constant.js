const REACT_APP_GOOGLE_MAPS_KEY = "AIzaSyC5nKn2X9S8tR0cmYKyiXeOUXut5jEif6E";
const GET_ALL_TRIP_API = "http://209.38.168.38/trip/get?skip=0&limit=0"
const POST_BOOK_TRIP = "http://209.38.168.38/trip/customer/book/call-center"
const GET_VEHICILE_TYPES = "http://209.38.168.38/vehicle/vehicle-types"

const CANCEL_TRIP = (id) => {
    return `http://209.38.168.38/trip/cancel/${id}`
}

const GET_TRIP_API = (id) => {
    return `http://209.38.168.38/trip/get/${id}`
}

const GET_VEHICLE_API = (num) =>
{
    return `http://209.38.168.38/vehicle/${num}`
}

const GET_VEHICLE_DOC_API = (id) => 
{
    return `http://209.38.168.38/vehicle/download-document/${id}`
}

const TRIP_STATUS = [
    "Init",
    "Collecting",
    "End",
    "Determining",
    "Schedule",
    "Picking",
    "Waiting"
]

export {
    REACT_APP_GOOGLE_MAPS_KEY, 
    GET_ALL_TRIP_API, 
    POST_BOOK_TRIP,
    GET_VEHICILE_TYPES,
    GET_TRIP_API,
    GET_VEHICLE_API,
    GET_VEHICLE_DOC_API,
    TRIP_STATUS, 
    CANCEL_TRIP
};


  
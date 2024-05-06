import { useHistory,useParams } from "react-router-dom";
import useFetch from "./useFetch";

const VehicleDetails = () => {
    const { number } = useParams();
    const {data: vehicle, error, isPending } = useFetch('http://209.38.168.38/vehicle/' + number);


    return (
        <div className="vehicle-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {vehicle && (
                <article>
                    <h2> {vehicle.vehicle_number} </h2>
                    <h2> {vehicle.make} - {vehicle.mode} </h2>
                    <div>Loại Xe: {vehicle.vehicle_type.name}</div>
                    <button onClick={handleClick}>delete</button>
                </article>
            )}
        </div>
    );
}

export default BlogDetails;
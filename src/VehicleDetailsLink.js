import {Link} from 'react-router-dom';


const VehicleDetailLink = ({VehicleNumber}) => {
    return (
        <div className="vehicle-details-link">
            <Link to={`/VehicleDetails/${VehicleNumber}`}>
            Verify
            </Link> 
        </div>
    );
}

export default VehicleDetailLink;
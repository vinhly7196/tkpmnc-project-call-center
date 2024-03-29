import {Link} from 'react-router-dom';

const Trip = ({Trip}) => {
    return (
        <div className="blog-list">
            {
                Trip.map((trip) => (
                    <div className="blog-preview" key={trip.id}>

                        <Link to={`/Trip/${trip.id}`}>
                        <h2>{trip.id}</h2>
                        <p>Khách Hàng {trip.HoTen}</p>
                        </Link>
                    </div>
                ))
            }
        </div>
    );
};

export default Trip;

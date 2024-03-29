import { useHistory,useParams } from "react-router-dom";
import useFetch from "./useFetch";

const TripDetails = () => {
    const { id } = useParams();
    const {data: trip, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
    const history = useHistory();

    const handleClick = () => {
        fetch('http://localhost:8000/blogs/' + id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        })
    }

    return (
        <div className="trip-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {trip && (
                <article>
                    <h2> {trip.id} </h2>
                    <p>Khách hàng {trip.KhachHang}</p>
                    <div>{trip.body}</div>
                    <button onClick={handleClick}>Cancel</button>
                </article>
            )}
        </div>
    );
}

export default BlogDetails;
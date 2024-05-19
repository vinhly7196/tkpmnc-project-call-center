import { Link } from "react-router-dom";

const Navbar = () => {
    return (  
        <nav className="navbar">
            <h1>Call Center</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/vehicles">Vehicles</Link>
                <Link to="/create" style={{
                    color: 'white', 
                    backgroundColor: '#f1356d',
                    borderRadius: '8px'
                }} >Add</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;
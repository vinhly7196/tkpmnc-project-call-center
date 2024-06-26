import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create';
import VehicleTable from './VehicleTable';
import NotFound from './NotFound';
import VehicleDetails from './VehicleDetails';
import TripDetails from './TripDetails';
import TripList from './TripList';
function App() {

  


  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>

            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/create">
              <Create />
            </Route>

            <Route path="/vehicles">
              <VehicleTable />
            </Route>

            <Route path="/VehicleDetails/:number">
              <VehicleDetails />
            </Route>

            <Route path="/TripDetails/:trip_id">
              <TripDetails />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
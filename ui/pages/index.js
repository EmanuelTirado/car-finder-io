import Jumbotron from "react-bootstrap/Jumbotron"
import Button from "react-bootstrap/Button"
import App from "../components/App"
import TopVehicles from "../components/TopVehicles"

export default () => (
  <App>
    <Jumbotron>
      <h1>Find the car of your dreams!</h1>
      <p>
        Browse through our Neo4j database to find your ideal ride.
      </p>
      <p>
        <Button variant="primary">Learn more</Button>
      </p>
    </Jumbotron>
    
    <h3 className="text-center">Highest Rated Vehicles</h3>
    <TopVehicles />
  </App>
)
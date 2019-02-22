import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import ReactStars from "react-stars";

function VehicleCard({ width, vehicle, onDetails }) {
  return (
    <Card className="mb-4" style={{ width: width || "18rem" }}>
      <Card.Img variant="top" src={vehicle.images[0]} alt={vehicle.model} />
      <Card.Body>
        <Card.Title>{`${vehicle.make} ${vehicle.model}`}</Card.Title>
          <ReactStars count={5} value={vehicle.avgStars} size={18} edit={false} />
        <Card.Text>
          {vehicle.avgStars ? parseFloat(vehicle.avgStars.toFixed(2)) : "-"} / 5
        </Card.Text>
        <Button
          variant="outline-primary"
          onClick={onDetails}
          style={{
            position: "absolute",
            bottom: "18px",
            right: "18px"
          }}
        >
          Details
        </Button>
      </Card.Body>
    </Card>
  )
}

export default VehicleCard

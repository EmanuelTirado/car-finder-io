import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

function VehicleCard({ vehicle, onDetails }) {
  return (
    <Card className="mb-4" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={vehicle.images[0]} alt={vehicle.model} />
      <Card.Body>
        <Card.Title>{`${vehicle.make} ${vehicle.model}`}</Card.Title>
        <Card.Text>User Rating: {vehicle.avgStars} / 5</Card.Text>
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

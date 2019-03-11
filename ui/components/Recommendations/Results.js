import React, { useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"
import ReactStars from "react-stars"
import VehicleModalExt from "../Vehicles/VehicleModalExt"

function Vehicle({ vehicle, onDetails }) {
  return (
    <ListGroup.Item>
      <Image
        src={vehicle.images[0]}
        alt={`${vehicle.make} ${vehicle.model}`}
        width="200"
        className="float-left mr-4"
      />
      <h4>
        {vehicle.make} {vehicle.model}
      </h4>
      <ReactStars count={5} value={vehicle.avgStars} size={18} edit={false} />
      <Button
        variant="outline-primary"
        onClick={() => onDetails(parseInt(vehicle._id, 10))}
        style={{
          position: "absolute",
          bottom: "18px",
          right: "18px"
        }}
      >
        Details
      </Button>
    </ListGroup.Item>
  )
}

function Results({ vehicles, onLoadMore, showLoadMoreButton }) {
  const [selectedVehicleId, setSelectedVehicleId] = useState(null)
  const [vehicleDetailsModalState, setVehicleDetailsModalState] = useState(
    false
  )

  const handleVehicleDetailsButtonClick = vehicleId => {
    setSelectedVehicleId(vehicleId)
    setVehicleDetailsModalState(true)
  }

  const handleOnModalHide = () => {
    setVehicleDetailsModalState(false)
  }

  return (
    <>
      <ListGroup className="mb-4">
        {vehicles.map(vehicle => (
          <Vehicle
            key={vehicle._id}
            vehicle={vehicle}
            onDetails={handleVehicleDetailsButtonClick}
          />
        ))}
      </ListGroup>

      {showLoadMoreButton ? (
        <Button variant="outline-info" onClick={onLoadMore}>
          Load More...
        </Button>
      ) : (
        ""
      )}

      <VehicleModalExt
        vehicleId={selectedVehicleId}
        onHide={handleOnModalHide}
        isOpen={vehicleDetailsModalState}
      />
    </>
  )
}

export default Results

import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import PartialResults from "./PartialResults"
import { repeat } from "../../lib/helpers"
import VehicleModalExt from "../Vehicles/VehicleModalExt"

function SearchResults({ filters }) {
  const [pages, setPages] = useState(1)
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
      <div className="mt-4 d-flex flex-wrap justify-content-between">
        {repeat(
          index => (
            <PartialResults
              key={index}
              filters={filters}
              pageNumber={index}
              onVehicleDetailsButtonClick={handleVehicleDetailsButtonClick}
            />
          ),
          pages
        )}
      </div>
      <Button
        variant="link"
        onClick={() => {
          setPages(pages + 1)
        }}
        className="mb-4"
      >
        Load More
      </Button>
      <VehicleModalExt
        vehicleId={selectedVehicleId}
        onHide={handleOnModalHide}
        isOpen={vehicleDetailsModalState}
      />
    </>
  )
}

export default SearchResults

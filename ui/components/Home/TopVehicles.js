import { useState } from "react"
import { useQuery } from "react-apollo-hooks"
import VehicleCard from "../Vehicles/VehicleCard"
import VehicleModalSimple from "../Vehicles/VehicleModalSimple"
import gql from "graphql-tag"

const TOP_VEHICLES_QUERY = gql`
  query getTopVehicles {
    vehiclesTopN(first: 10) {
      make
      model
      avgStars
      drivenWheels
      images
      fuel
      hpMin
      hpMax
      cylindersMin
      cylindersMax
      trany
      drivenWheels
      doorsMax
      doorsMin
      size
      highwayMpgMin
      highwayMpgMax
      cityMpgMin
      cityMpgMax
      popularity
      minMsrp
      maxMsrp
    }
  }
`

function TopVehicles() {
  const [modalOpenState, setModalOpenState] = useState(false)
  const [selected, setSelected] = useState(null)
  const { data, errors, loading } = useQuery(TOP_VEHICLES_QUERY)

  if (loading) {
    return <div>Loading...</div>
  }

  if (errors) {
    return <div>An error has occurred.</div>
  }

  const vehicles = data.vehiclesTopN || []

  const hideModal = () => setModalOpenState(false)

  return (
    <>
      <div className="mt-4 d-flex flex-wrap justify-content-between">
        {vehicles.map((vehicle, index) => (
          <VehicleCard
            key={index}
            vehicle={vehicle}
            onDetails={() => {
              setSelected(vehicle)
              setModalOpenState(true)
            }}
          />
        ))}
      </div>
      <VehicleModalSimple
        isOpen={modalOpenState}
        onHide={hideModal}
        vehicle={selected}
      />
    </>
  )
}

export default TopVehicles

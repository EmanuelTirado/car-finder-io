import React from "react"
import { useQuery } from "react-apollo-hooks"
import gql from "graphql-tag"
import Card from "react-bootstrap/Card"
import VehicleCard from "../Vehicles/VehicleCard"

const PAGE_SIZE = 21

const GET_VEHICLES = gql`
  query searchVehicles($tags: [String], $manufacturers: [String], $first: Int = ${PAGE_SIZE}, $offset: Int = 0) {
    vehicleByTags(searchTags: $tags, manufacturers: $manufacturers, first: $first, offset: $offset) {
      _id
      make
      model
      avgStars
      images
    }
  }
`

function PartialResults({ pageNumber, filters, onVehicleDetailsButtonClick }) {
  const { data, loading, error } = useQuery(GET_VEHICLES, {
    variables: {
      ...filters,
      first: PAGE_SIZE,
      offset: pageNumber * PAGE_SIZE
    }
  })

  if (loading) {
    return (
      <Card className="mb-4" style={{ width: "14rem" }}>
        <Card.Body>
          <Card.Text>Loading...</Card.Text>
        </Card.Body>
      </Card>
    )
  }

  if (error) {
    return <div>An error has occurred.</div>
  }

  const vehicles = data.vehicleByTags || []

  return vehicles.map((vehicle, index) => (
    <VehicleCard
      key={index}
      vehicle={vehicle}
      width="15rem"
      onDetails={() => {
        onVehicleDetailsButtonClick(parseInt(vehicle._id, 10))
      }}
    />
  ))
}

export default PartialResults

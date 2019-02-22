import { useQuery } from "react-apollo-hooks"
import gql from "graphql-tag"
import VehicleCard from "../VehicleCard"

const GET_VEHICLES_FILTERED = gql`
  query($tags: [String]) {
    vehicleByTags(searchTags: $tags) {
      _id
      make
      model
      avgStars
      images
    }
  }
`

function SearchResults({ tags }) {
  const { data, loading, error } = useQuery(GET_VEHICLES_FILTERED, {
    variables: { tags }
  })

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>An error has occurred.</div>
  }

  const vehicles = data.vehicleByTags || []

  return (
    <div className="mt-4 d-flex flex-wrap justify-content-between">
      {vehicles.map((vehicle, index) => (
        <VehicleCard key={index} vehicle={vehicle} width="15rem" onDetails={() => {}} />
      ))}
    </div>
  )
}

export default SearchResults

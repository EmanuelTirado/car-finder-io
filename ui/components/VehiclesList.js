import gql from "graphql-tag"
import { useQuery } from "react-apollo-hooks"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const GET_DATA = gql`
  query {
    manufacturers: Manufacturer {
      name
      vehicleCount
    }
    categories: MarketCategory {
      name
      vehicleCount
    }
  }
`

/*
  query ($first: Int, $offset: Int) {
    vehicles: Vehicle(first: $first, offset: $offset) {
      _id
      make
      model
      avgStars
      images
    }

*/

function SidePanel({ manufacturers, categories }) {
  const makers = manufacturers || []
  const cats = categories || []
  return (
    <div>
      <ul>
        {makers.map((maker, index) => (
          <li key={index}>
            {maker.name} ({maker.vehicleCount})
          </li>
        ))}
      </ul>
    </div>
  )
}

function VehiclesList() {
  const { data, loading } = useQuery(GET_DATA)

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Row>
      <Col
        xs={3}
        style={{
          borderRight: "1px solid #ccc"
        }}
      >
        <SidePanel {...data} />
      </Col>
      <Col>Cars go here</Col>
    </Row>
  )
}

export default VehiclesList

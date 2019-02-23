import React, { useState } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import SidePanel from "./SidePanel"
import SearchResults from "./SearchResults"

function VehicleBrowser() {
  const [filters, setFilters] = useState({ tags: [], manufacturers: [] })

  return (
    <Row className="mt-4">
      <Col
        xs="5"
        md="4"
        lg="3"
        style={{
          borderRight: "1px solid #ccc"
        }}
      >
        <SidePanel onUpdate={updatedTags => setFilters(updatedTags)} />
      </Col>
      <Col>
        <SearchResults filters={filters} />
      </Col>
    </Row>
  )
}

export default VehicleBrowser

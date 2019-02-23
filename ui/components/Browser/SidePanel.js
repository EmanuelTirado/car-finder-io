import React, { useState, useEffect } from "react"
import { useQuery } from "react-apollo-hooks"
import gql from "graphql-tag"
import Form from "react-bootstrap/Form"

const GET_DATA = gql`
  query {
    manufacturers: Manufacturer(orderBy: name_asc) {
      name
      vehicleCount
    }
    categories: MarketCategory(orderBy: name_asc) {
      name
      vehicleCount
    }
  }
`

function SidePanel({ onUpdate }) {
  const { data, loading } = useQuery(GET_DATA)
  const [manufacturers, setManufacturers] = useState([])
  const [tags, setTags] = useState([])

  useEffect(() => onUpdate({ tags, manufacturers }), [tags, manufacturers])

  if (loading) {
    return <div>Loading...</div>
  }

  const makers = data.manufacturers || []
  const cats = data.categories || []

  const updateManufacturers = (checked, maker) => {
    if (checked) {
      setManufacturers([...manufacturers, maker])
    } else {
      const index = manufacturers.indexOf(maker)
      manufacturers.splice(index, 1)
      setManufacturers([...manufacturers])
    }
  }

  const updateTags = (checked, tag) => {
    if (checked) {
      setTags([...tags, tag])
    } else {
      const index = tags.indexOf(tag)
      tags.splice(index, 1)
      setTags([...tags])
    }
  }

  return (
    <div>
      <h5>Makers</h5>
      <ul>
        {makers.map((maker, index) => (
          <li key={index}>
            <Form.Check
              type="checkbox"
              id={`makerChk${index}`}
              label={`${maker.name} (${maker.vehicleCount})`}
              onChange={ev =>
                updateManufacturers(ev.target.checked, maker.name)
              }
            />
          </li>
        ))}
      </ul>
      <h5>Categories</h5>
      <ul>
        {cats.map((cat, index) => (
          <li key={index}>
            <Form.Check
              type="checkbox"
              id={`catChk${index}`}
              label={`${cat.name} (${cat.vehicleCount})`}
              onChange={ev => updateTags(ev.target.checked, cat.name)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SidePanel

import Table from "react-bootstrap/Table"
import { makeSingleValueOrRange, formatMoney } from "../../lib/helpers"

/*
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
*/

function VehicleDetails({ vehicle }) {
  return (
    <Table striped bordered hover size="sm">
      <tbody>
        <tr>
          <td>Horse Power</td>
          <td>
            {makeSingleValueOrRange(vehicle.hpMin, vehicle.hpMax)}
          </td>
        </tr>
        <tr>
          <td>Cylinders</td>
          <td>
            {makeSingleValueOrRange(vehicle.cylindersMin, vehicle.cylindersMax)}
          </td>
        </tr>
        <tr>
          <td>Fuel Type</td>
          <td>{(vehicle.fuel || []).join(", ") || "-"}</td>
        </tr>
        <tr>
          <td>MPG</td>
          <td>
            City: {makeSingleValueOrRange(vehicle.cityMpgMin, vehicle.cityMpgMax)} / 
            Highway: {makeSingleValueOrRange(vehicle.highwayMpgMin, vehicle.highwayMpgMin)}
          </td>
        </tr>
        <tr>
          <td>Transmission</td>
          <td>{(vehicle.trany || []).join(", ") || "-"}</td>
        </tr>
        <tr>
          <td>MSRP</td>
          <td>
            {makeSingleValueOrRange(vehicle.minMsrp, vehicle.maxMsrp, formatMoney)}
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export default VehicleDetails

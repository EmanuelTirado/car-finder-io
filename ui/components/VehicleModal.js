import Modal from "react-bootstrap/Modal"
import Table from "react-bootstrap/Table"
import Carousel from "react-bootstrap/Carousel"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"

/*
  year: String
  images: [String]
  fuel: [String]
  hpMin: Int
  hpMax: Int
  cylindersMin: Int
  cylindersMax: Int
  trany: [String]
  drivenWheels: [String]
  doorsMax: Int
  doorsMin: Int
  size: String
  highwayMpgMin: Float
  highwayMpgMax: Float
  cityMpgMin: Float
  cityMpgMax: Float
  popularity: Int
  minMsrp: Int
  maxMsrp: Int
*/

function VehicleModal({ isOpen, onHide, vehicle }) {
  if (!vehicle) return <div />
  return (
    <Modal show={isOpen} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{`${vehicle.make} ${vehicle.model}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col sm="5">
            <Carousel style={{ width: "300px" }}>
              {vehicle.images.map((url, index) => (
                <Carousel.Item key={index}>
                  <div className="bg-dark d-flex justify-content-center">
                    <img src={url} height="200" />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col sm="7">
            <Table striped bordered hover size="sm">
              <tbody>
                <tr>
                  <td className="">Horse Power</td>
                  <td>
                    {vehicle.hpMin === vehicle.hpMax
                      ? vehicle.hpMax
                      : `${vehicle.hpMin} – ${vehicle.hpMax}`}
                  </td>
                </tr>
                <tr>
                  <td>Fuel Type</td>
                  <td>{(vehicle.fuel || []).join(", ") || "-"}</td>
                </tr>
                <tr>
                  <td>Cylinders</td>
                  <td>
                    {vehicle.cylindersMin === vehicle.cylindersMax
                      ? vehicle.cylindersMax
                      : `${vehicle.cylindersMin} – ${vehicle.cylindersMax}`}
                  </td>
                </tr>
                <tr>
                  <td>Transmission</td>
                  <td>{(vehicle.trany || []).join(", ") || "-"}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default VehicleModal

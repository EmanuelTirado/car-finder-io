import Modal from "react-bootstrap/Modal"
import Table from "react-bootstrap/Table"
import Carousel from "react-bootstrap/Carousel"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import VehicleDetails from "./VehicleDetails"

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
          <Col>
            <VehicleDetails vehicle={vehicle} />
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

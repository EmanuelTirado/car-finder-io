import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

function LearnMoreModal({ isOpen, onHide }) {
  return (
    <Modal show={isOpen} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Car Finder PRO</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Browse and review vehicles.
        </p>
        <p>
          Visit our <a href="https://mcode.io/api" target="_blank">GraphQL API playground</a>.
        </p>
        <p>
          Visit our <a href="https://mcode.io/browser" target="_blank">Neo4j Instance</a>.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default LearnMoreModal

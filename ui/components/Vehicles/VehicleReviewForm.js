import React, { useState, useEffect } from "react"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ReactStars from "react-stars"
import Button from "react-bootstrap/Button"

function VehicleReviewForm({ onSubmit, onChange }) {
  const [starsRating, setStartsRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (starsRating > 0 && reviewText.length > 0) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
    onChange({ starsRating, reviewText })
  }, [reviewText, starsRating])

  return (
    <Form>
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Star Rating
        </Form.Label>
        <Col sm="10">
          <ReactStars
            count={5}
            value={starsRating}
            size={26}
            half={false}
            onChange={newValue => setStartsRating(newValue)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Review
        </Form.Label>
        <Col sm="10">
          <Form.Control
            as="textarea"
            defaultValue={reviewText}
            onChange={ev => setReviewText(ev.target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col sm="10" className="offset-sm-2">
          <Button disabled={!isValid} variant="success" onClick={onSubmit}>
            Post
          </Button>
        </Col>
      </Form.Group>
    </Form>
  )
}

export default VehicleReviewForm

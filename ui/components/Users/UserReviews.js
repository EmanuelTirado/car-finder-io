import ListGroup from "react-bootstrap/ListGroup"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ReactStars from "react-stars"

function UserReviews({ reviews, showVehicleTitle }) {
  return (
    <ListGroup>
      {reviews.map((review, index) => (
        <ListGroup.Item key={index}>
          {showVehicleTitle ? (
            <h5>
              {review.vehicle.make} {review.vehicle.model}
            </h5>
          ) : (
            ""
          )}
          <Row>
            <Col md={12} xl={2}>
              <ReactStars
                count={5}
                value={review.starsRating}
                size={18}
                edit={false}
              />
            </Col>
            <Col>
              {review.reviewText}
              <p className="mt-1">
                {review.writtenBy ? (
                  <em className="text-muted">
                    {`By: ${review.writtenBy.firstName} ${
                      review.writtenBy.lastName
                    }`}
                  </em>
                ) : (
                  ""
                )}
              </p>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default UserReviews

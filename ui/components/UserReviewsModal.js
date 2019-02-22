import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import ListGroup from "react-bootstrap/ListGroup"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import gql from "graphql-tag"
import { useQuery } from "react-apollo-hooks"
import ReactStars from "react-stars"

const GET_USER_REVIEWS = gql`
  query($userId: Int) {
    user(id: $userId) {
      firstName
      lastName
      reviews {
        vehicle {
          make
          model
        }
        reviewText
        starsRating
      }
    }
  }
`

function UserReviews({ reviews }) {
  return reviews.map((review, index) => (
    <ListGroup.Item key={index}>
      <h5>
        {review.vehicle.make} {review.vehicle.model}
      </h5>
      <Row>
        <Col md={12} xl={2}>
          <ReactStars count={5} value={review.starsRating} size={18} edit={false} />
        </Col>
        <Col xl={10}>{review.reviewText}</Col>
      </Row>
      <p />
    </ListGroup.Item>
  ))
}

function UsersReviewsModal({ userId, isOpen, onHide }) {
  if (!userId) {
    return <div />
  }

  const { data, loading } = useQuery(GET_USER_REVIEWS, {
    variables: {
      userId
    }
  })

  const { user } = data

  return (
    <Modal show={isOpen} onHide={onHide} size="lg" centered>
      {loading ? (
        <Modal.Body>Loading...</Modal.Body>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{`${user.firstName} ${user.lastName}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {user.reviews.length === 0 ? (
                <em>{`${user.firstName} hasn't reviewed anything yet!`}</em>
              ) : (
                <UserReviews reviews={user.reviews} />
              )}
            </ListGroup>
          </Modal.Body>
        </>
      )}
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UsersReviewsModal

import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import gql from "graphql-tag"
import { useQuery } from "react-apollo-hooks"
import UserReviews from "./UserReviews";

const GET_USER_REVIEWS = gql`
  query getUserReviews($userId: Int) {
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

function UsersReviewsModal({ userId, isOpen, onHide }) {
  const { data, loading } = useQuery(GET_USER_REVIEWS, {
    variables: {
      userId
    },
    skip: !userId
  })

  if (!data)
    return <div />

  const { user } = data

  return (
    <Modal show={isOpen} onHide={onHide} size="lg" centered>
      {loading && !user ? (
        <Modal.Body>Loading...</Modal.Body>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{`${user.firstName} ${user.lastName}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {user.reviews.length === 0 ? (
                <em>{`${user.firstName} hasn't reviewed anything yet!`}</em>
              ) : (
                <UserReviews reviews={user.reviews} showVehicleTitle={true} />
              )}
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

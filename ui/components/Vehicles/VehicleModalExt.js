import React, { useContext, useState } from "react"
import gql from "graphql-tag"
import { useQuery, useMutation } from "react-apollo-hooks"
import Modal from "react-bootstrap/Modal"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Carousel from "react-bootstrap/Carousel"
import Alert from "react-bootstrap/Alert"
import { UserContext } from "../../lib/user-context"
import UserReviews from "../Users/UserReviews"
import VehicleDetails from "./VehicleDetails"
import VehicleReviewForm from "./VehicleReviewForm"

const GET_VEHICLE_DATA = gql`
  query getVehicleData($vehicleId: Int!, $userId: Int!) {
    vehicle(_id: $vehicleId) {
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
      reviews {
        starsRating
        reviewText
        writtenBy {
          firstName
          lastName
          avatar
        }
      }
    }
    currentUser: user(_id: $userId) {
      hasReviewedVehicle(vehicleId: $vehicleId)
    }
  }
`

const POST_REVIEW = gql`
  mutation createNewPost(
    $userId: Int!
    $vehicleId: Int!
    $starsRating: Int!
    $reviewText: String!
  ) {
    review: newReview(
      userId: $userId
      vehicleId: $vehicleId
      review: { starsRating: $starsRating, reviewText: $reviewText }
    ) {
      _id
    }
  }
`

function VehicleModalExt({ vehicleId, isOpen, onHide, onNewReview }) {
  const [newReview, setNewReview] = useState({})
  const userCtx = useContext(UserContext)
  const userId = userCtx._id
  const { data, loading, error } = useQuery(GET_VEHICLE_DATA, {
    variables: { vehicleId, userId },
    skip: !(vehicleId && userCtx._id)
  })
  const submitReview = useMutation(POST_REVIEW, {
    variables: {
      userId,
      vehicleId,
      ...newReview
    },
    refetchQueries: ["getVehicleData", "searchVehicles", "getTopVehicles"]
  })

  if (!data || error || loading) return <div />

  const { vehicle, currentUser } = data

  return (
    <Modal show={isOpen} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {vehicle.make} {vehicle.model}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xl="4">
            <Carousel style={{ width: "300px" }} className="mb-3 mx-auto">
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
            <Tabs defaultActiveKey="detail" id="vehicleDetail" className="mb-3">
              <Tab eventKey="detail" title="Details">
                <VehicleDetails vehicle={vehicle} />
              </Tab>
              <Tab eventKey="reviews" title="Reviews">
                <UserReviews reviews={vehicle.reviews} />
              </Tab>
              <Tab
                eventKey="writeReview"
                title="Write a Review"
                disabled={userCtx.status !== "logged-in"}
              >
                {currentUser.hasReviewedVehicle ? (
                  <Alert variant="success">Thank you for your review!</Alert>
                ) : (
                  <VehicleReviewForm
                    onSubmit={submitReview}
                    onChange={values => setNewReview(values)}
                  />
                )}
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default VehicleModalExt

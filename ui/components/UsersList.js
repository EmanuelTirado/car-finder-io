import React, { useState } from "react"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import UserListRows from "./UserListRows"
import UserReviewsModal from "./UserReviewsModal"

function UsersList() {
  const [pages, setPages] = useState(1)
  const [userReviewsOpenState, setUserReviewsOpenState] = useState(false)
  const [userReviewsSelectedId, setUserReviewsSelectedId] = useState(null)
  const showUserReviewsModal = userId => {
    setUserReviewsSelectedId(userId)
    setUserReviewsOpenState(true)
  }
  const hideUserReviewsModal = () => {
    setUserReviewsOpenState(false)
  }
  return (
    <>
      <style jsx>{`
        .table tbody > tr > td {
          vertical-align: middle;
        }
      `}</style>
      <Table bordered striped hover size="sm">
        <thead>
          <tr>
            <th className="text-center">...</th>
            <th className="text-center">#</th>
            <th>User</th>
            <th className="text-center">Reviews</th>
            <th className="text-center">Avg. Ratings</th>
            <th className="text-center">Region</th>
            <th className="text-center"></th>
          </tr>
        </thead>
        <tbody>
          {Array(pages)
            .fill(1)
            .map((page, index) => (
              <UserListRows
                key={index}
                pageNumber={index}
                showUserReviewsModal={showUserReviewsModal}
              />
            ))}
        </tbody>
      </Table>
      <Button
        variant="outline-primary"
        className="mb-5"
        onClick={() => setPages(pages + 1)}
      >
        Load more...
      </Button>
      <UserReviewsModal
        userId={userReviewsSelectedId}
        isOpen={userReviewsOpenState}
        onHide={hideUserReviewsModal}
      />
    </>
  )
}

export default UsersList

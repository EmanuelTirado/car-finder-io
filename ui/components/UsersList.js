import React, { useState, useContext, Fragment } from "react"
import gql from "graphql-tag"
import { useQuery } from "react-apollo-hooks"
import { UserContext } from "../lib/user-context"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"

const PAGE_SIZE = 20

const GET_USERS = gql`
  query($pageSize: Int, $offset: Int) {
    users: User(first: $pageSize, offset: $offset, orderBy: id_asc) {
      id
      firstName
      lastName
      avatar
      reviewCount
      avgStars
    }
  }
`

function UserListRows({ pageNumber, authenticate }) {
  const { data, loading } = useQuery(GET_USERS, {
    variables: {
      pageSize: PAGE_SIZE,
      offset: PAGE_SIZE * pageNumber
    }
  })

  if (loading) {
    return (
      <tr>
        <td colSpan={5}>Loading...</td>
      </tr>
    )
  }

  return (
    <Fragment>
      {data.users.map((user, index) => (
        <tr key={index}>
          <td>{user.id}</td>
          <td>
            <Image
              src={user.avatar}
              roundedCircle
              style={{ width: "25px", height: "25px" }}
              className="mr-2 bg-dark"
            />
            {user.firstName + " " + user.lastName}
          </td>
          <td className="text-center">{user.reviewCount}</td>
          <td className="text-center">
            {user.avgStars ? parseFloat(user.avgStars).toFixed(2) : "-"}
          </td>
          <td className="text-center">
            <Button variant="link" size="sm" onClick={() => authenticate(user)}>
              Switch To
            </Button>
          </td>
        </tr>
      ))}
    </Fragment>
  )
}

function UsersList() {
  const [pages, setPages] = useState(1)
  const userCtx = useContext(UserContext)
  return (
    <div>
      <style jsx>{`
        .table tbody > tr > td {
          vertical-align: middle;
        }
      `}</style>
      <Table bordered striped hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th className="text-center">Reviews</th>
            <th className="text-center">Avg. Ratings</th>
            <th className="text-center">...</th>
          </tr>
        </thead>
        <tbody>
          {Array(pages)
            .fill(1)
            .map((page, index) => (
              <UserListRows
                key={index}
                pageNumber={index}
                authenticate={userCtx.authenticate}
              />
            ))}
        </tbody>
      </Table>
      <button onClick={() => setPages(pages + 1)}>Load more...</button>
    </div>
  )
}

export default UsersList

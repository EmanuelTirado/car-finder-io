import { useContext } from "react"
import { useQuery } from "react-apollo-hooks"
import gql from "graphql-tag"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"
import { UserContext } from "../lib/user-context"

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
      region {
        name
      }
    }
  }
`

function UserListRows({ pageNumber, showUserReviewsModal }) {
  const userCtx = useContext(UserContext)
  const { data, loading } = useQuery(GET_USERS, {
    variables: {
      pageSize: PAGE_SIZE,
      offset: PAGE_SIZE * pageNumber
    }
  })

  if (loading) {
    return (
      <tr>
        <td colSpan={7}>Loading...</td>
      </tr>
    )
  }

  return (
    <>
      {data.users.map((user, index) => (
        <tr key={index}>
          <td className="text-center">
            {userCtx.id === user.id ? (
              <Button variant="link" size="sm" disabled>
                Logged In
              </Button>
            ) : (
              <Button
                variant="link"
                size="sm"
                onClick={() => userCtx.authenticate(user)}
              >
                Login As
              </Button>
            )}
          </td>
          <td className="text-center">{user.id}</td>
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
          <td className="text-center">{user.region.name}</td>
          <td className="text-center">
            <Button
              variant="link"
              size="sm"
              onClick={() => showUserReviewsModal(user.id)}
            >
              Reviews
            </Button>
          </td>
        </tr>
      ))}
    </>
  )
}

export default UserListRows

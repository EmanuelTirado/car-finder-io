import React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"

class UserReviews extends React.Component {
  constructor() {
    super()
    this.state = {
      userIdSelected: null
    }
  }

  render() {
    const ALL_USERS = gql`
      query getAllUsersQuery {
        allUsers: User {
          id
          name
        }
      }
    `
    const SELECTED_USER_QUERY = gql`
      query getSelectedUserQuery($userId: ID!) {
        selectedUser: user(id: $userId) {
          id
          name
          reviews {
            business {
              name
            }
            text
            date {
              formatted
            }
          }
        }
      }
    `
    const QUERY_VARS = {
      userId: this.state.userIdSelected
    }

    return (
      <div>
        <Query query={ALL_USERS}>
          {({ loading, error, data }) => {
            if (loading) return "Loading..."
            if (error) return `Error! ${error.message}`

            return (
              <div>
                <img src="https://tse2.mm.bing.net/th?id=OIP.dgZ17wAFRb0MTsniAu7JtQHaEk&pid=Api" />
                <select
                  onInput={e => {
                    this.setState({ userIdSelected: e.target.value })
                  }}
                >
                  <option />
                  {data.allUsers.map(u => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>

                {this.state.userIdSelected ? (
                  <Query query={SELECTED_USER_QUERY} variables={QUERY_VARS}>
                    {({ loading, error, data }) => {
                      if (loading) return "Loading..."
                      console.log(data)
                      return (
                        <div>
                          <h2>{data.selectedUser.name}</h2>
                        </div>
                      )
                    }}
                  </Query>
                ) : (
                  <p>Select a user....</p>
                )}
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default UserReviews

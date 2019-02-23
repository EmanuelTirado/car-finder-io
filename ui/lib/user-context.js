import React, { Component, createContext } from "react"
import gql from "graphql-tag"

export const UserContext = createContext()
export const UserConsumer = UserContext.Consumer

class UserProvider extends Component {
  state = {
    status: "logged-out",
    id: null,
    _id: null,
    firstName: "",
    lastName: "",
    avatar: ""
  }

  client = null

  constructor(props) {
    super(props)
    this.client = this.props.client
  }

  authenticate = async ({ id }) => {
    const GET_USER = gql`
      query($userId: Int!) {
        user(id: $userId) {
          id
          _id
          firstName
          lastName
          avatar
        }
      }
    `
    const { data } = await this.client.query({
      query: GET_USER,
      variables: {
        userId: id
      }
    })

    this.setState(
      {
        status: "logged-in",
        _id: parseInt(data.user._id, 10),
        id: data.user.id,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        avatar: data.user.avatar
      },
      () => {
        this.persist()
      }
    )
  }

  persist = () => {
    localStorage.setItem("user-info", 
      JSON.stringify({
        ...this.state
      })
    )
  }

  componentDidMount() {
    const values = localStorage.getItem("user-info")
    if (values) {
      this.setState({
        ...JSON.parse(values)
      })
    }
  }

  render() {
    return (
      <UserContext.Provider
        value={{ ...this.state, authenticate: this.authenticate }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default UserProvider

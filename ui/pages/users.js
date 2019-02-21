import App from "../components/App"
import Header from "../components/Header"
import UsersList from "../components/UsersList"

const Users = () => {
  return (
    <App>
      <h1>Website Users</h1>

      <UsersList />
    </App>
  )
}

export default Users

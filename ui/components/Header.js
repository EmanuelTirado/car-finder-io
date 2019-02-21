import { useContext } from "react"
import Link from "next/link"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Image from "react-bootstrap/Image"
import { withRouter } from "next/router"
import { UserContext } from "../lib/user-context"

const links = [
  { href: "/", name: "Home" },
  { href: "/cars", name: "Cars" },
  { href: "/users", name: "People" }
]

const Header = ({ router: { pathname } }) => {
  const userCtx = useContext(UserContext)
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>🚘 CAR FINDER PRO</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse className="justify-content-end">
        <Nav>
          {links.map(link => (
            <Nav.Item key={link.href}>
              <Link prefetch href={link.href}>
                <Nav.Link
                  href={link.href}
                  active={pathname === link.href ? "true" : undefined}
                >
                  {link.name}
                </Nav.Link>
              </Link>
            </Nav.Item>
          ))}
        </Nav>
        <Navbar.Text className="ml-3">
          Signed in as:{" "}
          <a href="#login">
            {userCtx.firstName} {userCtx.lastName}
            <Image
              src={userCtx.avatar}
              roundedCircle
              style={{ width: "25px", height: "25px" }}
              className="ml-2 bg-light"
            />
          </a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default withRouter(Header)

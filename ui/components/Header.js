import Link from "next/link"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { withRouter } from "next/router"
import HeaderLoginStatus from "./HeaderLoginStatus"

const links = [
  { href: "/", name: "Home" },
  { href: "/cars", name: "Cars" },
  { href: "/users", name: "People" }
]

const Header = ({ router: { pathname } }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>
        🚘 <strong>CAR FINDER</strong> PRO
      </Navbar.Brand>
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
          <HeaderLoginStatus />
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default withRouter(Header)

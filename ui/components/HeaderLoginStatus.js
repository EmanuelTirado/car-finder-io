import { useContext } from "react"
import { UserContext } from "../lib/user-context"
import Image from "react-bootstrap/Image"

function HeaderLoginStatus() {
  const userCtx = useContext(UserContext)

  if (userCtx.status === "logged-in")
    return (
      <>
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
      </>
    )

  return <>Not logged in</>
}

export default HeaderLoginStatus

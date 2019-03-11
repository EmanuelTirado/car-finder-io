import React from "react"
import Alert from "react-bootstrap/Alert"

function OnEmpty() {
  return (
    <Alert variant="info">
      No recommendations at this time. Start reviewing vehicles and then return
      here.
    </Alert>
  )
}

export default OnEmpty

import React, { useState, useEffect, useContext } from "react"
import { useQuery } from "react-apollo-hooks"
import { UserContext } from "../../lib/user-context"
import gql from "graphql-tag"
import Results from "./Results"
import OnEmpty from "./OnEmpty"

const PAGE_SIZE = 20

const GET_USER_RECOMMENDATIONS = gql`
  query userRecommendations($userId: Int, $threshold: Float = 0.00, $first: Int = ${PAGE_SIZE}, $offset: Int = 0) {
    user(_id: $userId) {
      recommended(threshold: $threshold, first: $first, offset: $offset, orderBy: avgStars_desc) {
        _id
        make
        model
        avgStars
        images
      }
    }
  }
`

function Recommendations() {
  const userCtx = useContext(UserContext)
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true)
  const { data, loading, error, fetchMore } = useQuery(
    GET_USER_RECOMMENDATIONS,
    {
      variables: {
        userId: userCtx._id,
        offset: 0
      },
      skip: userCtx.status !== "logged-in"
    }
  )

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error... {error}</div>
  }

  const vehicles = (data && data.user && data.user.recommended) || []

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        offset: vehicles.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          setShowLoadMoreButton(false)
          return prev
        }
        if (fetchMoreResult.user.recommended.length < PAGE_SIZE) {
          setShowLoadMoreButton(false)
        }
        return Object.assign({}, prev, {
          user: {
            ...prev.user,
            recommended: [
              ...prev.user.recommended,
              ...fetchMoreResult.user.recommended
            ]
          }
        })
      }
    })
  }

  return vehicles.length === 0 ? (
    <OnEmpty />
  ) : (
    <Results
      vehicles={vehicles}
      onLoadMore={handleLoadMore}
      showLoadMoreButton={showLoadMoreButton && !(vehicles.length < PAGE_SIZE)}
    />
  )
}

export default Recommendations

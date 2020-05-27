import React from "react"
import { Link } from "gatsby"

const ReadOtherPosts = () => {
  return (
    <div className="pagination">
      <div className="pagination__title">
        <span className="pagination__title-h">Read other posts</span>
        <hr />
      </div>

      <div className="pagination__buttons">
        <span className="button previous">
          <Link to="/">
            <span className="button__icon">←</span>
            <span className="button__text">Prev post</span>
          </Link>
        </span>

        <span className="button next">
          <Link to="/">
            <span className="button__text">Next post</span>
            <span className="button__icon">→</span>
          </Link>
        </span>
      </div>
    </div>
  )
}

export default ReadOtherPosts

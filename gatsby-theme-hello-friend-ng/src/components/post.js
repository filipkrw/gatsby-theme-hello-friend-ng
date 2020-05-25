import React from "react"

const Post = ({ title, published_at, body }) => (
  <div>
    <h2>{title}</h2>
    <p>{published_at}</p>
    <p>{body}</p>
  </div>
)

export default Post

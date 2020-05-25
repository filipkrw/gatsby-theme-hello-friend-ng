import React from "react"
import { Link } from "gatsby"

const PostList = ({ posts }) => (
  <>
    <h2>Posts</h2>
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <strong>
            <Link to={post.slug}>{post.title}</Link>
          </strong>
          <br />
          {new Date(post.published_at).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </li>
      ))}
    </ul>
  </>
)

export default PostList

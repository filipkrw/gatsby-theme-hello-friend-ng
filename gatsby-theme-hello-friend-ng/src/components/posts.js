import React from "react"
import { Link } from "gatsby"

const Posts = ({ title, posts }) => {
  const postsByYear = posts.reduce((groups, post) => {
    const year = new Date(post.published_at).getFullYear()
    // Map.prototype.set returns the whole Map object
    return groups.set(year, [...(groups.get(year) || []), post])
  }, new Map())

  const postsJSX = []
  postsByYear.forEach((posts, year) => {
    postsJSX.push(
      <div className="posts-group" key={year}>
        <div className="post-year">{year}</div>
        <ul className="posts-list">
          {posts.map((post) => (
            <li className="post-item" key={post.id}>
              <Link to={post.slug}>
                <span className="post-title">{post.title}</span>
                <span className="post-day">
                  {new Date(post.published_at).toLocaleDateString("en-GB", {
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  })

  return (
    <main className="posts">
      <h1>{title}</h1>
      {posts.length > 0 ? (
        postsJSX
        ) : (
        <p>Nothing here yet.</p>
      )}
    </main>
  )
}

export default Posts

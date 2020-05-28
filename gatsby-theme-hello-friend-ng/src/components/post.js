import React from "react"
import { Link } from "gatsby"

import ClockIcon from "./icons/clock"
import NotepadIcon from "./icons/notepad"
import TagIcon from "./icons/tag"
import CalendarIcon from "./icons/calendar"

const Post = ({ title, published_at, body, tags, words, readTime }) => (
  <main className="post">
    <div className="post-info">
      <p>
        <ClockIcon />
        {readTime} minute read
        <Link to="#">
          <span className="flag flag-icon flag-icon-gb flag-icon-squared"></span>
        </Link>
      </p>
    </div>

    <article>
      <h1 className="post-title">{title}</h1>
      <hr />

      <div className="post-content">{body}</div>
    </article>

    <hr />

    <div className="post-info">
      <p>
        <TagIcon />
        {tags.map((tag) => (
          <span className="tag">
            <Link to="#">{tag}</Link>
          </span>
        ))}
      </p>

      <p>
        <NotepadIcon />
        {words} words
      </p>

      <p>
        <CalendarIcon />
        {new Date(published_at).toLocaleDateString("en-GB", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    </div>
  </main>
)

export default Post

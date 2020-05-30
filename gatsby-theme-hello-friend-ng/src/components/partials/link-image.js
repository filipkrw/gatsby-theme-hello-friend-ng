import React from "react"
import PostImage from "./post-image"

const LinkImage = ({ src, url, title }) => {
  return (
    <a href={url} title={title} target="_blank" rel="noreferrer">
      <PostImage src={src} alt={title} />
    </a>
  )
}

export default LinkImage

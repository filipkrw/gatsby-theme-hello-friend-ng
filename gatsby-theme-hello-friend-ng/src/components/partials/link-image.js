import React from "react"
import Image from "./image"

const LinkImage = ({ file, url, title, wide = false }) => {
  return (
    <a href={url} title={title} target="_blank" rel="noreferrer">
      <Image file={file} alt={title} wide={wide} />
    </a>
  )
}

export default LinkImage

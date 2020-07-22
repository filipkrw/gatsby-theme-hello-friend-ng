import React from "react"
import ImageOther from "./image-other"

import "react-lazy-load-image-component/src/effects/opacity.css"

const ImageExternal = ({ src, alt, width, height, wide }) => {
  if (width && height) {
    return (
      <ImageOther
        src={src}
        alt={alt}
        width={width}
        height={height}
        wide={wide}
      />
    )
  } else {
    return (
      <div
        className={wide ? "outer-img-container wide" : "outer-img-container"}
      >
        <img src={src} alt={alt} />
      </div>
    )
  }
}

export default ImageExternal

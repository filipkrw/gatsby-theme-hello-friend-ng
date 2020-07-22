import React from "react"

import ImagePlaceholder from "./image-placeholder"

import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/opacity.css"

const ImageOther = ({ src, alt, width, height, wide }) => {
  return (
    <ImagePlaceholder width={width} height={height} wide={wide}>
      <LazyLoadImage src={src} alt={alt} effect="opacity" />
    </ImagePlaceholder>
  )
}

export default ImageOther

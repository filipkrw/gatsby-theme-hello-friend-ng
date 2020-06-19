import React, { useState } from "react"
import Img from "gatsby-image"

import ImagePlaceholder from "./image-placeholder"

const ImageSharp = ({ image, alt, wide }) => {
  const [opacity, setOpacity] = useState(0)

  return (
    <ImagePlaceholder
      width={image.fluid.presentationWidth}
      height={image.fluid.presentationHeight}
      wide={wide}
    >
      <span className="img-opacity-transition" style={{ opacity }}>
        <Img
          fluid={image.fluid}
          alt={alt}
          placeholderStyle={{ visibility: "hidden" }}
          fadeIn={true}
          onLoad={() => setOpacity(1)}
        />
      </span>
    </ImagePlaceholder>
  )
}

export default ImageSharp

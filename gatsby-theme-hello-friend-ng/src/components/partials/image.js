import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import ImageOther from "./image-other"
import ImagePlaceholder from "./image-placeholder"
import ImageSharp from "./image-sharp"

const query = graphql`
  query {
    allImageSharp {
      nodes {
        fluid(maxWidth: 860) {
          originalName
          presentationWidth
          presentationHeight
          ...GatsbyImageSharpFluid
        }
      }
    }
    allFile(
      filter: {
        extension: { nin: ["jpg", "png"] }
        sourceInstanceName: { eq: "image" }
      }
    ) {
      nodes {
        fields {
          dimensions {
            height
            width
          }
        }
        relativePath
        publicURL
      }
    }
  }
`

const Image = ({ file, alt, wide = false }) => {
  const data = useStaticQuery(query)

  /*
    JPGs and PNGs, supported by gatsby-transformer-sharp
  */
  const imageSharp = data.allImageSharp.nodes.find(
    (node) => node.fluid.originalName === file
  )

  if (imageSharp) return <ImageSharp image={imageSharp} alt={alt} wide={wide} />

  /*
    Other images, like GIFs, unsupported by gatsby-transformer-sharp
  */
  const imageOther = data.allFile.nodes.find(
    (node) => node.relativePath === file
  )

  if (imageOther)
    return (
      <ImageOther
        width={imageOther.fields.dimensions.width}
        height={imageOther.fields.dimensions.height}
        src={imageOther.publicURL}
        alt={alt}
        wide={wide}
      />
    )

  return null
}

export default Image

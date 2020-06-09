import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

const Image = ({ file, alt, wide = false }) => {
  const data = useStaticQuery(graphql`
    query {
      allImageSharp {
        nodes {
          fluid(maxWidth: 860) {
            originalName
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const image = data.allImageSharp.nodes.find(
    (node) => node.fluid.originalName === file
  )

  const wideClass = wide ? "wide" : ""

  return image ? (
    <Img
      fluid={image.fluid}
      alt={alt}
      className={`image-rounded ${wideClass}`}
      placeholderStyle={{ visibility: "hidden" }}
    />
  ) : null
}

export default Image

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
      allFile(
        filter: {
          extension: { nin: ["jpg", "png"] }
          sourceInstanceName: { eq: "image" }
        }
      ) {
        nodes {
          relativePath
          publicURL
        }
      }
    }
  `)

  const className = wide ? "image-rounded wide" : "image-rounded"

  /*
    JPGs and PNGs, supported by gatsby-transformer-sharp
  */
  const imageSharp = data.allImageSharp.nodes.find(
    (node) => node.fluid.originalName === file
  )

  if (imageSharp)
    return (
      <Img
        fluid={imageSharp.fluid}
        alt={alt}
        className={className}
        placeholderStyle={{ visibility: "hidden" }}
      />
    )

  /*
    Other images like GIFs, unsupported by gatsby-transformer-sharp
  */
  const imageOther = data.allFile.nodes.find(
    (node) => node.relativePath === file
  )

  if (imageOther)
    return (
      <div className={className}>
        <img src={imageOther.publicURL} alt={alt} />
      </div>
    )

  return null
}

export default Image

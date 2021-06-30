import React from "react"
import { graphql } from "gatsby"
import Shortcodes from "../components/shortcodes"

import LayoutMain from "../components/layouts/main"
import Posts from "../components/posts"
import SEO from "../components/seo"

export const query = graphql`
  query {
    allFile(
      sort: { fields: childMdx___frontmatter___published_at, order: DESC }
      filter: { sourceInstanceName: { eq: "post" } }
    ) {
      nodes {
        childMdx {
          frontmatter {
            published_at
            title
          }
        }
        fields {
          slug
        }
        id
      }
    }
    site {
      siteMetadata {
        helloFriendNG {
          blog {
            title
            description
            image
          }
        }
      }
    }
  }
`

const PostsTemplate = ({ data }) => {
  const nodes = data.allFile.nodes
  const posts = nodes.map((node) => ({
    ...node.childMdx.frontmatter,
    ...node.fields,
    id: node.id,
  }))
  const metadata = data.site.siteMetadata.helloFriendNG.blog

  return (
    <LayoutMain>
      <SEO
        title={metadata.title}
        description={metadata.description}
        image={metadata.image}
      />
      <Shortcodes>
        <Posts posts={posts} title={metadata.title} />
      </Shortcodes>
    </LayoutMain>
  )
}

export default PostsTemplate

import React from "react"
import { graphql } from "gatsby"

import LayoutMain from "../components/layouts/main"
import Posts from "../components/posts"

export const query = graphql`
  query {
    allFile(
      sort: { fields: childMdx___frontmatter___published_at, order: DESC }
      filter: { sourceInstanceName: { eq: "post" } }
    ) {
      nodes {
        postInfo {
          path
        }
        childMdx {
          frontmatter {
            published_at
            title
          }
        }
        id
      }
    }
  }
`

const PostsTemplate = ({ data, pageContext }) => {
  const nodes = data.allFile.nodes
  const posts = nodes.map((node) => ({
    ...node.childMdx.frontmatter,
    ...node.postInfo,
    id: node.id,
  }))

  return (
    <LayoutMain>
      <Posts posts={posts} title={pageContext.title} />
    </LayoutMain>
  )
}

export default PostsTemplate

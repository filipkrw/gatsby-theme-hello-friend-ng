import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import Posts from "../components/posts"

export const query = graphql`
  query {
    allFile(
      sort: { fields: childMdx___frontmatter___published_at, order: DESC }
      filter: { sourceInstanceName: { eq: "post" } }
    ) {
      nodes {
        fields {
          slug
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

const PostsTemplate = ({ data }) => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     allPost(sort: { fields: published_at, order: DESC }) {
  //       nodes {
  //         id
  //         title
  //         published_at
  //         body
  //         slug
  //       }
  //     }
  //   }
  // `)
  // const posts = data.allPost.nodes
  const nodes = data.allFile.nodes
  const posts = nodes.map((node) => ({
    ...node.childMdx.frontmatter,
    ...node.fields,
    id: node.id,
  }))

  return (
    <Layout>
      <Posts posts={posts} />
    </Layout>
  )
}

export default PostsTemplate

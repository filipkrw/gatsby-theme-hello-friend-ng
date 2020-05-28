import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import Post from "../components/post"

export const query = graphql`
  query($id: String!) {
    file(id: { eq: $id }) {
      childMdx {
        frontmatter {
          published_at
          title
          tags
        }
        wordCount {
          words
        }
        body
      }
    }
  }
`

const PostTemplate = ({ data, pageContext }) => {
  const body = <MDXRenderer>{data.file.childMdx.body}</MDXRenderer>
  const words = data.file.childMdx.wordCount.words
  const readTime = Math.max(1, Math.round(words / 200))

  const post = {
    ...data.file.childMdx.frontmatter,
    body,
    words,
    readTime,
  }

  return (
    <Layout>
      <Post {...post} />
    </Layout>
  )
}

export default PostTemplate

import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import PostLayout from "../components/post-layout"
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
        timeToRead
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
  const readTime = data.file.childMdx.timeToRead

  const post = {
    ...data.file.childMdx.frontmatter,
    body,
    words,
    readTime,
  }

  return (
    <PostLayout>
      <Post {...post} />
    </PostLayout>
  )
}

export default PostTemplate

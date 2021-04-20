import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Shortcodes from "../components/shortcodes"

import LayoutArticle from "../components/layouts/article"
import Post from "../components/post"
import SEO from "../components/seo"

export const query = graphql`
  query($id: String!) {
    file(id: { eq: $id }) {
      childMdx {
        frontmatter {
          published_at
          title
          tags
          show_word_count
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
    <LayoutArticle>
      <SEO title={post.title} />
      <Shortcodes>
        <Post {...post} />
      </Shortcodes>
    </LayoutArticle>
  )
}

export default PostTemplate

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
          description
          image
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
  const frontmatter = data.file.childMdx.frontmatter
  const body = <MDXRenderer>{data.file.childMdx.body}</MDXRenderer>
  const words = data.file.childMdx.wordCount.words
  const readTime = data.file.childMdx.timeToRead

  const post = {
    ...frontmatter,
    body,
    words,
    readTime,
  }

  return (
    <LayoutArticle>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        image={frontmatter.image}
      />
      <Shortcodes>
        <Post {...post} />
      </Shortcodes>
    </LayoutArticle>
  )
}

export default PostTemplate

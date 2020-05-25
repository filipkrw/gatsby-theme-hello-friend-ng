import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import PostList from "../components/post-list"

const PostsTemplate = () => {
  const data = useStaticQuery(graphql`
    query {
      allPost(sort: { fields: published_at, order: ASC }) {
        nodes {
          id
          title
          published_at
          body
          slug
        }
      }
    }
  `)
  const posts = data.allPost.nodes

  return (
    <Layout>
      <PostList posts={posts} />
    </Layout>
  )
}

export default PostsTemplate

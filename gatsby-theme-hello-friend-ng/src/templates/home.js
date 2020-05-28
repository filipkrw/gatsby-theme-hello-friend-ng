import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import Home from "../components/home"

export const query = graphql`
  query {
    file(sourceInstanceName: { eq: "home" }) {
      childMdx {
        id
        body
      }
    }
  }
`

const HomeTemplate = ({ data, pageContext }) => {
  const content = <MDXRenderer>{data.file.childMdx.body}</MDXRenderer>
  return (
    <Layout>
      <Home content={content} />
    </Layout>
  )
}

export default HomeTemplate

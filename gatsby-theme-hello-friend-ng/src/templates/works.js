import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import Works from "../components/works"

export const query = graphql`
  query {
    file(sourceInstanceName: { eq: "works" }) {
      childMdx {
        id
        body
      }
    }
  }
`

const WorksTemplate = ({ data, pageContext }) => {
  const content = <MDXRenderer>{data.file.childMdx.body}</MDXRenderer>
  return (
    <Layout>
      <Works content={content} />
    </Layout>
  )
}

export default WorksTemplate

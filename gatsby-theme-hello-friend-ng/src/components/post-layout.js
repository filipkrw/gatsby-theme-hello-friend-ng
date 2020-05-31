import React from "react"
import Layout from "./layout"

const PostLayout = ({ children }) => {
  return (
    <Layout>
      <main className="post">{children}</main>
    </Layout>
  )
}

export default PostLayout

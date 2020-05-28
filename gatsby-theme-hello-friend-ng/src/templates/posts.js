// import React from "react"
// import { graphql, useStaticQuery } from "gatsby"
//
// import Layout from "../components/layout"
// import Posts from "../components/posts"
//
// const PostsTemplate = () => {
//   const data = useStaticQuery(graphql`
//     query {
//       allPost(sort: { fields: published_at, order: DESC }) {
//         nodes {
//           id
//           title
//           published_at
//           body
//           slug
//         }
//       }
//     }
//   `)
//   const posts = data.allPost.nodes
//
//   return (
//     <Layout>
//       <Posts posts={posts} />
//     </Layout>
//   )
// }
//
// export default PostsTemplate

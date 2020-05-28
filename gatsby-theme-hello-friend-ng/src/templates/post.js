// import React from "react"
// import { graphql } from "gatsby"
//
// import Layout from "../components/layout"
// import Post from "../components/post"
//
// export const query = graphql`
//   query($postID: String!) {
//     post(id: { eq: $postID }) {
//       title
//       published_at(formatString: "MMMM DD YYYY")
//       body
//       slug
//       tags
//     }
//   }
// `
//
// const PostTemplate = ({ data: { post }, pageContext }) => {
//   return (
//     <Layout>
//       <Post {...post} />
//     </Layout>
//   )
// }
//
// export default PostTemplate

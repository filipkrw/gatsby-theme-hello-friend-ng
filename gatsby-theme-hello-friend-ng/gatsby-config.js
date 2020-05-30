module.exports = ({ contentPath = "content", basePath = "/" }) => ({
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "home", path: `${contentPath}/home.mdx` },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "works", path: `${contentPath}/works.mdx` },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "post", path: `${contentPath}/posts` },
    },
    "gatsby-plugin-mdx",
  ],
})

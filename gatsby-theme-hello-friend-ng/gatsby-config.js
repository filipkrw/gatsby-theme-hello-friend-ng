module.exports = ({ contentPath = "content", blogPath = "blog" }) => ({
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "post", path: `${contentPath}/posts` },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        defaultLayouts: {
          index: require.resolve("./src/components/layout.js"),
          default: require.resolve("./src/components/post-layout.js"),
        },
      },
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: `${contentPath}/pages`,
      },
    },
  ],
})

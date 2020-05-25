module.exports = ({ contentPath = "content", basePath = "/" }) => ({
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: contentPath,
      },
    },
    {
      resolve: "gatsby-transformer-yaml",
      options: {
        typeName: "Post",
      },
    },
  ],
})

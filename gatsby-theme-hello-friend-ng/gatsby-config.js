module.exports = ({ contentPath = "content", basePath = "/" }) => ({
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "home",
        path: `${contentPath}/home.mdx`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "post",
        path: `${contentPath}/posts`,
      },
    },
    "gatsby-plugin-mdx",
    // {
    //   resolve: "gatsby-transformer-yaml",
    //   options: {
    //     typeName: "Post",
    //     path: contentPath,
    //   },
    // },
  ],
})

module.exports = ({
  contentPath = "content",
  blog = {
    title: "Blog",
    path: "blog",
  },
  mode = { default: "dark", allowChange: true },
  menuLinks = [
    {
      name: "Blog",
      link: `/${blog.path}`,
    },
  ],
}) => ({
  siteMetadata: {
    helloFriendNG: {
      mode,
      menuLinks,
    },
  },
  plugins: [
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "post", path: `${contentPath}/posts` },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "image", path: `${contentPath}/images` },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/layouts/article.js"),
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

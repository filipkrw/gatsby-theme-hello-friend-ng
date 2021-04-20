module.exports = ({
  contentPath = "content",
  blog = {
    create: true,
    title: "Blog",
    path: "blog",
  },
  mode = {
    default: "dark",
    allowChange: true
  },
  menuLinks = [
    {
      name: "Blog",
      link: `/${blog.path}`,
    },
  ],
}) => ({
  siteMetadata: {
    title: "Hello Friend NG",
    titleTemplate: "%s – Hello Friend NG",
    description: "",
    url: "localhost:8000", // No trailing slash allowed!
    image: "",
    twitterUsername: "",
    helloFriendNG: {
      mode,
      menuLinks,
      blog: {
        title: blog.title
      }
    }
  },
  plugins: [
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "post", path: `${contentPath}/posts` },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "image", path: `${contentPath}/images` },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "page", path: `${contentPath}/pages` },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/layouts/article.js"),
        },
      },
    }
  ],
})

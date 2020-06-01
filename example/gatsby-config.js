module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme-hello-friend-ng",
      options: {
        contentPath: "content",
        blogPath: "posts",
        menuLinks: [
          {
            name: "Blog",
            link: `/posts`,
          },
          {
            name: "Works",
            link: `/works`,
          },
        ],
      },
    },
  ],
}

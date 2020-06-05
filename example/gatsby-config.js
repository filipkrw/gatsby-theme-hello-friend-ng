module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme-hello-friend-ng",
      options: {
        contentPath: "content",
        blog: {
          path: "posts",
          title: "Posts",
        },
        mode: {
          default: "dark",
          allowChange: true,
        },
        menuLinks: [
          {
            name: "Posts",
            link: "/posts",
          },
          {
            name: "Works",
            link: "/works",
          },
        ],
      },
    },
  ],
}

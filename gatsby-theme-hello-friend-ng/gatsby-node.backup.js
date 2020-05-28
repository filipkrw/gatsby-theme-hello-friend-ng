const fs = require("fs")
const slugify = require("slugify")

// Make sure the data directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || "content"

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
}

// https://github.com/gatsbyjs/gatsby/pull/12671
exports.onCreatePage = ({ actions, page }) => {
  actions.createPage(page)
}

// Define the "Post" type
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type Post implements Node @dontInfer {
      id: ID!
      title: String!
      published_at: Date! @dateformat @proxy(from: "published_at")
      body: String!
      slug: String!
      tags: [String!]
    }
    type Home implements Node @dontInfer {
      id: ID!
      title: String!
      subittle: String!
    }
  `)
}

// Define resolvers for custom fields
exports.createResolvers = ({ createResolvers }, options) => {
  const basePath = options.basePath || "/"
  const createPath = (slug) =>
    `/${basePath}/blog/${slug}`.replace(/\/\/+/g, "/")

  createResolvers({
    Post: {
      slug: {
        resolve: (source) => createPath(slugify(source.title.toLowerCase())),
      },
    },
  })
}

exports.createPages = async ({ actions, graphql, reporter }, options) => {
  const basePath = options.basePath || "/"

  // Create home page
  actions.createPage({
    path: basePath,
    component: require.resolve("./src/templates/home.js"),
  })

  // Create blog main page
  actions.createPage({
    path: `${basePath}/blog/`.replace(/\/\/+/g, "/"),
    component: require.resolve("./src/templates/posts.js"),
  })

  // Query for posts
  const result = await graphql(`
    query {
      allPost(sort: { fields: published_at, order: ASC }) {
        nodes {
          id
          slug
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panic("Error loading posts", result.errors)
    return
  }

  // Create a page for each post
  const posts = result.data.allPost.nodes
  posts.forEach((post) => {
    const slug = post.slug

    actions.createPage({
      path: slug,
      component: require.resolve("./src/templates/post.js"),
      context: {
        postID: post.id,
        readOtherPosts: options.readOtherPosts || false,
      },
    })
  })
}

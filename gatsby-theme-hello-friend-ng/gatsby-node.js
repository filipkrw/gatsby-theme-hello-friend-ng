const fs = require("fs")

// Make sure the data directory exists
exports.onPreBootstrap = ({ reporter }) => {
  const contentPath = "data"

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
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
    }
  `)
}

// Define resolvers for custom fields
exports.createResolvers = ({ createResolvers }) => {
  const basePath = "/"

  // Quick-and-dirty helper to convert strings into URL-friendly slugs.
  const slugify = (str) => {
    const slug = str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")

    return `/${basePath}/${slug}`.replace(/\/\/+/g, "/")
  }

  createResolvers({
    Post: {
      slug: {
        resolve: (source) => slugify(source.title),
      },
    },
  })
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const basePath = "/"

  // Set up the call to create the root page
  actions.createPage({
    path: basePath,
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
      },
    })
  })
}

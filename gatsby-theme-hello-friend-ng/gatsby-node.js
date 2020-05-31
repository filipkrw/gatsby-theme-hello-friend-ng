const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")

exports.createPages = async (
  { actions, graphql, reporter },
  { blogPath = "blog" }
) => {
  // Create main blog page
  actions.createPage({
    path: blogPath,
    component: require.resolve("./src/templates/posts.js"),
  })

  // Create blog post pages
  const result = await graphql(`
    query {
      allFile(filter: { sourceInstanceName: { eq: "post" } }) {
        nodes {
          fields {
            path
          }
          id
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic("Error loading mdx files", result.errors)
  }

  result.data.allFile.nodes.forEach((node) => {
    actions.createPage({
      path: node.fields.path,
      component: require.resolve("./src/templates/post.js"),
      context: { id: node.id },
    })
  })
}

// Add path field to posts, to be able to link to them
exports.onCreateNode = ({ node, actions }, { blogPath = "blog" }) => {
  if (node.internal.type !== "File") {
    return
  }

  actions.createNodeField({
    node,
    name: "path",
    value: path.join(blogPath, node.name),
  })
}

exports.onPreBootstrap = ({ reporter }, { contentPath = "content" }) => {
  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }

  const postsPath = path.join(contentPath, "posts")
  if (!fs.existsSync(postsPath)) {
    reporter.info(`creating the ${postsPath} directory`)
    fs.mkdirSync(postsPath)
  }
}

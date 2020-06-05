const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")

exports.createPages = async (
  { actions, graphql, reporter },
  { blog = { title: "Blog", path: "blog" } }
) => {
  // Create main blog page
  actions.createPage({
    path: blog.path,
    component: require.resolve("./src/templates/posts.js"),
    context: {
      title: blog.title,
    },
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
exports.onCreateNode = (
  { node, actions },
  { blog = { title: "Blog", path: "blog" } }
) => {
  if (node.internal.type !== "File") {
    return
  }

  actions.createNodeField({
    node,
    name: "path",
    value: path.join(blog.path, node.name),
  })
}

exports.onPreBootstrap = ({ reporter }, { contentPath = "content" }) => {
  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }

  const postsDirPath = path.join(contentPath, "posts")
  if (!fs.existsSync(postsDirPath)) {
    reporter.info(`creating the ${postsDirPath} directory`)
    fs.mkdirSync(postsDirPath)
  }
}

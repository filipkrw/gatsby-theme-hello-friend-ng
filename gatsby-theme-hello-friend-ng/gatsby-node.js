const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")

exports.createPages = async ({ actions, graphql, reporter }, options) => {
  // Creating homepage
  actions.createPage({
    path: options.basePath || "/",
    component: require.resolve("./src/templates/home.js"),
  })

  // Creating main blog page
  actions.createPage({
    path: `${options.basePath}/blog`.replace(/\/\/+/g, "/"),
    component: require.resolve("./src/templates/posts.js"),
  })

  // Creating blog post pages
  const result = await graphql(`
    query {
      allFile(filter: { sourceInstanceName: { eq: "post" } }) {
        nodes {
          fields {
            slug
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
      path: node.fields.slug,
      component: require.resolve("./src/templates/post.js"),
      context: { id: node.id },
    })
  })
}

exports.onCreateNode = ({ node, actions }, options) => {
  if (node.internal.type !== "File") {
    return
  }

  const toPostPath = (node) => {
    const { dir } = path.parse(node.relativePath)
    const basePath = options.basePath || "/"

    return path.join(`${basePath}/blog`.replace(/\/\/+/g, "/"), dir, node.name)
  }

  const slug = toPostPath(node)
  actions.createNodeField({
    node,
    name: "slug",
    value: slug,
  })
}

exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
}

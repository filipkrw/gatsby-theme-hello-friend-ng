const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")

exports.createPages = async ({ actions, graphql, reporter }, { basePath }) => {
  // Creating home page
  actions.createPage({
    path: basePath || "/",
    component: require.resolve("./src/templates/home.js"),
  })

  // Creating works page
  actions.createPage({
    path: `${basePath}/works`.replace(/\/\/+/g, "/"),
    component: require.resolve("./src/templates/works.js"),
  })

  // Creating main blog page
  actions.createPage({
    path: `${basePath}/blog`.replace(/\/\/+/g, "/"),
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

exports.onCreateNode = ({ node, actions }, { basePath }) => {
  if (node.internal.type !== "File") {
    return
  }

  const toPostPath = (node) => {
    const { dir } = path.parse(node.relativePath)
    basePath = basePath || "/"

    return path.join(`${basePath}/blog`.replace(/\/\/+/g, "/"), dir, node.name)
  }

  const slug = toPostPath(node)
  actions.createNodeField({
    node,
    name: "slug",
    value: slug,
  })
}

exports.onPreBootstrap = ({ reporter }, { contentPath }) => {
  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
}

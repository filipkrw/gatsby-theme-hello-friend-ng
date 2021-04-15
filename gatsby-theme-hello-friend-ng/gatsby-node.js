const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")
const imageSize = require("image-size")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type ImageSize {
      width: Int!
      height: Int!
    }
    type PostInfo {
      path: String!
    }
  `
  createTypes(typeDefs)
}

exports.createResolvers = (
  { createResolvers },
  { blog = { path: "blog" } }
) => {
  createResolvers({
    File: {
      imageSize: {
        type: "ImageSize",
        resolve: (source) => {
          if (source.sourceInstanceName === "image") {
            const { width, height } = imageSize(source.absolutePath)
            return { width, height }
          }
          return null
        },
      },
      postInfo: {
        type: "PostInfo",
        resolve: (source) => {
          if (source.sourceInstanceName === "post") {
            return { path: path.join(blog.path, source.name) }
          }
          return null
        },
      },
    },
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.sourceInstanceName === "post") {
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: "content/posts/",
      trailingSlash: false
    })

    createNodeField({
      node,
      name: "slug",
      value: `/posts${relativeFilePath}`,
    })
  }
}

exports.createPages = async (
  { actions, graphql, reporter },
  { blog = { title: "Blog", path: "blog" }, contentPath = "content" }
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

exports.onPreBootstrap = ({ reporter }, { contentPath = "content" }) => {
  const dirs = [
    contentPath,
    path.join(contentPath, "posts"),
    path.join(contentPath, "images"),
    path.join(contentPath, "pages"),
  ]

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      reporter.info(`creating the ${dir} directory`)
      fs.mkdirSync(dir)
    }
  }
}

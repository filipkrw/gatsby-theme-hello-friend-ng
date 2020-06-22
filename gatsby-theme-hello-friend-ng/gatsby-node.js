const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")
const imageSize = require("image-size")

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
          postInfo {
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
      path: node.postInfo.path,
      component: require.resolve("./src/templates/post.js"),
      context: { id: node.id },
    })
  })
}

// exports.onCreateNode = (
//   { node, actions },
//   { blog = { title: "Blog", path: "blog" } }
// ) => {
//   if (node.internal.type === "File") {
//     // Path field to posts, to be able to link to them
//     if (node.sourceInstanceName === "post") {
//       actions.createNodeField({
//         node,
//         name: "path",
//         value: path.join(blog.path, node.name),
//       })
//     }
//
//     // Image size field, to be able to neatly lazy load them
//     if (node.sourceInstanceName === "image") {
//       actions.createNodeField({
//         node,
//         name: "dimensions",
//         value: imageSize(node.absolutePath),
//       })
//     }
//   }
// }

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

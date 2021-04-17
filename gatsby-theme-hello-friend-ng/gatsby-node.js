const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")
const imageSize = require("image-size")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type Mdx implements Node {
      frontmatter: MdxFrontmatter!
    }
    type MdxFrontmatter {
      description: String
      image: String
    }
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
      }
    },
  })
}

exports.onCreateNode = (
  { node, getNode, actions },
  { blog = { path: "blog" }, contentPath = "content" }
  ) => {
  const { createNodeField } = actions

  if (node.sourceInstanceName === "page") {
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: `${contentPath}/pages/`,
      trailingSlash: false
    })

    createNodeField({
      node,
      name: "slug",
      value: `${relativeFilePath}`,
    })
  }

  if (node.sourceInstanceName === "post") {
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: `${contentPath}/posts/`,
      trailingSlash: false
    })

    createNodeField({
      node,
      name: "slug",
      value: `/${blog.path}${relativeFilePath}`,
    })
  }
}

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
            slug
          }
          id
        }
      }
    }
  `)

  if (result.errors) reporter.panic("Error loading mdx files", result.errors)

  result.data.allFile.nodes.forEach((node) => {
    actions.createPage({
      path: node.fields.slug,
      component: require.resolve("./src/templates/post.js"),
      context: { id: node.id },
    })
  })

  // Create general pages
  const resultP = await graphql(`
    query {
      allFile(filter: { sourceInstanceName: { eq: "page" } }) {
        nodes {
          fields {
            slug
          },
          id
        }
      }
    }
  `)

  if (resultP.errors) reporter.panic("Error loading mdx files", resultP.errors)

  resultP.data.allFile.nodes.forEach((node) => {
    actions.createPage({
      path: node.fields.slug,
      component: require.resolve("./src/templates/page.js"),
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

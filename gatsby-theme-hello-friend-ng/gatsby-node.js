const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")
const imageSize = require("image-size")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type File {
      childMdx: ChildMdx
      fields: Fields
    }
    type Mdx implements Node {
      frontmatter: MdxFrontmatter!
    }
    type ChildMdx {
      frontmatter: MdxFrontmatter
      body: String
      wordCount: WordCount
      timeToRead: Int
    }
    type MdxFrontmatter {
      title: String
      description: String
      image: String
      layout: String
      published_at: Date
      tags: [String]
      show_word_count: Boolean
    }
    type WordCount {
      words: Int
    }
    type ImageSize {
      width: Int!
      height: Int!
    }
    type Fields {
      slug: String
    }
  `
  createTypes(typeDefs)
}

exports.createResolvers = ({ createResolvers }) => {
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
      }
    },
  })
}

/*
  Create slug fields for posts and regular pages
*/
exports.onCreateNode = (
  { node, getNode, actions },
  { blog = { path: "blog" }, contentPath = "content" }
  ) => {
  const { createNodeField } = actions

  const paths = {
    page: {
      basePath: `${contentPath}/pages`,
      slugPrefix: ""
    },
    post: {
      basePath: `${contentPath}/posts`,
      slugPrefix: `/${blog.path}`
    }
  }

  if (Object.keys(paths).includes(node.sourceInstanceName)) {
    const nodePaths = paths[node.sourceInstanceName]

    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: nodePaths.basePath,
      trailingSlash: false
    })

    createNodeField({
      node,
      name: "slug",
      value: `${nodePaths.slugPrefix}${relativeFilePath}`,
    })
  }
}

exports.createPages = async (
  { actions, graphql, reporter },
  { blog = { create: true, title: "Blog", path: "blog" } }
) => {
  /*
    Create main blog page.
    Don't create only if the "create" option is explicitly set to false
  */
  if (blog.create !== false) {
    actions.createPage({
      path: blog.path,
      component: require.resolve("./src/templates/posts.js"),
      context: {
        title: blog.title,
      },
    })
  }

  /*
    Create posts and regular pages
  */
  const result = await graphql(`
    query {
      allFile(filter: { sourceInstanceName: { in: ["page", "post"] } }) {
        nodes {
          fields {
            slug
          }
          id
          sourceInstanceName
        }
      }
    }
  `)

  if (result.errors)
    reporter.panic("Error loading mdx files", result.errors)

  result.data.allFile.nodes.forEach((node) => {
    if (blog.create === false && node.sourceInstanceName === "post")
      return

    actions.createPage({
      path: node.fields.slug,
      component: require.resolve(`./src/templates/${node.sourceInstanceName}.js`),
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

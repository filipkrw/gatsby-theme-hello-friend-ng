import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import { MDXRenderer } from "gatsby-plugin-mdx"

import LayoutMain from "../components/layouts/main"
import LayoutArticle from "../components/layouts/article"
import SEO from "../components/seo"

export const query = graphql`
  query($id: String!) {
    file(id: { eq: $id }) {
      childMdx {
        frontmatter {
          title,
					layout,
					description,
					image
        }
        body
      }
    }
  }
`

const ArticleTemplate = ({ data }) => {
	const frontmatter = data.file.childMdx.frontmatter
	const Layout = frontmatter.layout === "center" ? LayoutMain : LayoutArticle

	return (
		<Layout>
			<SEO
				title={frontmatter.title}
				description={frontmatter.description}
				image={frontmatter.image}
			/>
			<MDXRenderer>
				{data.file.childMdx.body}
			</MDXRenderer>
		</Layout>
	)
}

export default ArticleTemplate

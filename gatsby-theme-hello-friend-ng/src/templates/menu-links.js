import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import MenuLinks from "../components/partials/menu-links"

const MenuLinksTemplate = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          menuLinks {
            name
            link
          }
        }
      }
    }
  `)

  return <MenuLinks items={data.site.siteMetadata.menuLinks} />
}

export default MenuLinksTemplate

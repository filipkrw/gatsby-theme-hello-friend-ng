import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Menu from "../components/partials/menu"

const MenuTemplate = () => {
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

  return <Menu items={data.site.siteMetadata.menuLinks} />
}

export default MenuTemplate

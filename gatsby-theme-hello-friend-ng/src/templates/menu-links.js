import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import MenuLinks from "../components/partials/menu-links"

const MenuLinksTemplate = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          helloFriendNG {
            menuLinks {
              name
              link
            }
          }
        }
      }
    }
  `)

  return <MenuLinks items={data.site.siteMetadata.helloFriendNG.menuLinks} />
}

export default MenuLinksTemplate

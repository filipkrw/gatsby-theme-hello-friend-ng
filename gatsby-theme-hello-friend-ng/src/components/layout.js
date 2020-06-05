import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useModeToggle } from "./hooks"

import Header from "./partials/header"
import FooterTemplate from "../templates/footer"

import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          helloFriendNG {
            mode {
              default
              allowChange
            }
          }
        }
      }
    }
  `)

  const [mode, toggleMode, allowChange] = useModeToggle(
    data.site.siteMetadata.helloFriendNG.mode
  )

  console.log("mode change")

  return (
    <div className={mode === "dark" ? "dark-theme" : ""}>
      <div className={"container"}>
        <Header toggleMode={toggleMode} allowChange={allowChange} />
        <div className={"content"}>{children}</div>
        <FooterTemplate />
      </div>
    </div>
  )
}

export default Layout

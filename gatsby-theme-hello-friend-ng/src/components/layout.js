import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Cookies from "js-cookie"

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

  const allowChange = data.site.siteMetadata.helloFriendNG.mode.allowChange
  const defaultMode =
    allowChange && Cookies.get("hello-friend-ng-mode")
      ? Cookies.get("hello-friend-ng-mode")
      : data.site.siteMetadata.helloFriendNG.mode.default

  const [mode, setMode] = useState(defaultMode)

  const toggleDarkMode = () => {
    const newMode = mode === "light" ? "dark" : "light"
    Cookies.set("hello-friend-ng-mode", newMode)
    setMode(newMode)
  }

  return (
    <div className={mode === "dark" && "dark-theme"}>
      <div className={"container"}>
        <Header toggleDarkMode={toggleDarkMode} allowChange={allowChange} />
        <div className={"content"}>{children}</div>
        <FooterTemplate />
      </div>
    </div>
  )
}

export default Layout

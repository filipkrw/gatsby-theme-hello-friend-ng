import React, { useState } from "react"
import Cookies from "js-cookie"

import Header from "./partials/header"
import Footer from "./partials/footer"

import "./layout.css"

const Layout = ({ children }) => {
  const [mode, setMode] = useState(Cookies.get("mode"))

  const toggleDarkMode = () => {
    const newMode = mode === "light" ? "dark" : "light"
    Cookies.set("mode", newMode)
    setMode(newMode)
  }

  return (
    <div className={mode === "dark" && "dark-theme"}>
      <div className={"container"}>
        <Header toggleDarkMode={toggleDarkMode} />
        <div className={"content"}>{children}</div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout

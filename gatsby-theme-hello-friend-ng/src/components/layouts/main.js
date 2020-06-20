import React, { useContext } from "react"

import ThemeContext from "../../context/theme-context"

import Header from "../partials/header"
import FooterTemplate from "../../templates/footer"

import "../../assets/css/default.css"
import "../../assets/css/custom.css"

const LayoutMain = ({ children }) => {
  const { mode } = useContext(ThemeContext)

  return (
    <>
      <div className={mode === "dark" ? "dark-theme" : ""}>
        <div className="container">
          <Header />
          <div className="content">{children}</div>
          <FooterTemplate />
        </div>
      </div>
    </>
  )
}

export default LayoutMain

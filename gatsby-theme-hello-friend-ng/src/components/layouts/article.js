import React, { useContext } from "react"

import LayoutCentered from "./centered"
import { ThemeProvider } from "../../context/theme-context"

const LayoutArticle = ({ children }) => {
  return (
    <ThemeProvider>
      <LayoutCentered>
        <main className="post">{children}</main>
      </LayoutCentered>
    </ThemeProvider>
  )
}

export default LayoutArticle

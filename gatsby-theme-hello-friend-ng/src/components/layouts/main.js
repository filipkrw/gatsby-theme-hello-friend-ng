import React from "react"
import { ThemeProvider } from "../../context/theme-context"
import LayoutCentered from "./centered"

import "../../assets/css/default.css"
import "../../assets/css/custom.css"

const LayoutMain = ({ children }) => {
  return (
    <ThemeProvider>
      <LayoutCentered>{children}</LayoutCentered>
    </ThemeProvider>
  )
}

export default LayoutMain

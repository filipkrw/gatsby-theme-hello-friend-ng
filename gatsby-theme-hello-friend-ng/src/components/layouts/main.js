import React from "react"
import LayoutCentered from "./centered"

import "../../assets/css/default.css"
import "../../assets/css/custom.css"

const LayoutMain = ({ children }) => {
  return <LayoutCentered>{children}</LayoutCentered>
}

export default LayoutMain

import React from "react"

import LayoutMain from "./main"

const LayoutArticle = ({ children }) => {
  return (
    <LayoutMain>
      <main className="post">{children}</main>
    </LayoutMain>
  )
}

export default LayoutArticle

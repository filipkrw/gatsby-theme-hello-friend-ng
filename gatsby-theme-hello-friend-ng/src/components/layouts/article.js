import React, { useState, useEffect, useRef } from "react"

import LayoutCentered from "./centered"

const LayoutArticle = ({ children }) => {
  const ref = useRef()

  return (
    <LayoutCentered>
      <main className="post" ref={ref}>
        {children}
      </main>
    </LayoutCentered>
  )
}

// const useContainerWidth = (ref) => {
//   const [width, setWidth] = useState()
//
//   useEffect(() => {
//     const handleSetWidth = () => {
//       setWidth(ref.current.offsetWidth)
//     }
//
//     if (ref.current) {
//       handleSetWidth()
//     }
//     window.addEventListener("resize", handleSetWidth)
//     return () => window.removeEventListener("resize", handleSetWidth)
//   }, [ref])
//
//   return width
// }

export default LayoutArticle

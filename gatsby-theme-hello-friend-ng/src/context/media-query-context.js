import React from "react"
import useMediaQueryMatch from "../hooks/useMediaQueryMatch"

const MediaQueryContext = React.createContext()

const MediaQueryProvider = ({ children }) => {
  const match = useMediaQueryMatch()

  return (
    <MediaQueryContext.Provider value={match}>
      {children}
    </MediaQueryContext.Provider>
  )
}

export default MediaQueryContext
export { MediaQueryProvider }

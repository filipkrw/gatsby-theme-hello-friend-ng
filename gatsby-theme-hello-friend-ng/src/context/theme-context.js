import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import useModeToggle from "../hooks/useModeToggle"

const ThemeContext = React.createContext({})

const ThemeProvider = ({ children }) => {
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

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleMode,
        allowChange,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext
export { ThemeProvider }

import React, { useContext } from "react"

import ThemeContext from "../../context/theme-context"

import SyntaxHighlighter from "react-syntax-highlighter"
import {
  tomorrow,
  tomorrowNight,
} from "react-syntax-highlighter/dist/esm/styles/hljs"

const CodeHighlight = ({
  children,
  language = "text",
  showLineNumbers = false,
}) => {
  const { currentMode } = useContext(ThemeContext)

  const customStyle = {
    display: "flex",
    justifyContent: "flex-start",
    padding: "15px 25px",
  }

  return (
    <SyntaxHighlighter
      language={language}
      style={currentMode === "dark" ? tomorrowNight : tomorrow}
      customStyle={customStyle}
      showLineNumbers={showLineNumbers}
    >
      {children}
    </SyntaxHighlighter>
  )
}

export default CodeHighlight

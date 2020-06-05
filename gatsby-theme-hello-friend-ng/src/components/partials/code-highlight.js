import React from "react"

import SyntaxHighlighter from "react-syntax-highlighter"
import { solarizedLight } from "react-syntax-highlighter/dist/esm/styles/hljs"

const CodeHighlight = ({
  children,
  language = "text",
  showLineNumbers = false,
}) => {
  const customStyle = {
    display: "flex",
    justifyContent: "flex-start",
    padding: "15px 25px",
  }

  return (
    <SyntaxHighlighter
      language={language}
      style={solarizedLight}
      customStyle={customStyle}
      showLineNumbers={showLineNumbers}
    >
      {children}
    </SyntaxHighlighter>
  )
}

export default CodeHighlight

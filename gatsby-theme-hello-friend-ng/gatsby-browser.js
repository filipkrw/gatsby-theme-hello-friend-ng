const React = require("react")
const { ThemeProvider } = require("./src/context/theme-context")
const { MediaQueryProvider } = require("./src/context/media-query-context")

exports.wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider>
      <MediaQueryProvider>{element}</MediaQueryProvider>
    </ThemeProvider>
  )
}

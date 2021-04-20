const React = require("react")
const { ThemeProvider } = require("./src/context/theme-context")
const { MediaQueryProvider } = require("./src/context/media-query-context")

exports.wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider>
      <MediaQueryProvider>
        {element}
      </MediaQueryProvider>
    </ThemeProvider>
  )
}

const MagicScriptTag = () => {
  const codeToRunOnClient = `
    (function() {
      if (typeof window !== 'undefined'
          && localStorage.getItem("hello-friend-ng-mode") === "dark") {
        document.body.classList.add('dark-theme');
      }
    })()
  `;
  
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />
};

exports.onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<MagicScriptTag key="hello-friend-ng-mode" />)
}
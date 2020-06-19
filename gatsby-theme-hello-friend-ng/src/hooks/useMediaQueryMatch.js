import { useState, useEffect } from "react"

const getWindowWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth

const useMediaQueryMatch = () => {
  // CSS variables declared in ./src/assets/scss/_variables.scss
  const properties = ["--phoneWidth", "--tabletWidth", "--fullWidth"]
  const [match, setMatch] = useState({})

  useEffect(() => {
    const handleQueryMatch = () => {
      for (const property of properties) {
        // Get media query for the property
        const query = getComputedStyle(document.body).getPropertyValue(property)

        // Check if media query matches and update if needed
        if (window.matchMedia(query).matches) {
          if (property !== match.mediaQueryMatch) {
            setMatch({ mediaQueryMatch: property })
          }

          // Get window size if use is on phone
          if (property === "--phoneWidth") {
            const phoneWidth = getWindowWidth()
            if (match.phoneWidth !== phoneWidth) {
              setMatch({ ...match, phoneWidth })
            }
          }

          break
        }
      }
    }

    handleQueryMatch()
    window.addEventListener("resize", handleQueryMatch)
    return () => window.removeEventListener("resize", handleQueryMatch)
  })

  return match
}

export default useMediaQueryMatch

import { useState, useEffect } from "react"
import Cookies from "js-cookie"

const useModeToggle = (data) => {
  /*
    Returns current theme mode ("light" or "dark"), theme mode toggle function
    and a boolean for if theme mode change is to be allowed.
  */
  const allowChange = data.allowChange
  const defaultMode =
    data.allowChange && Cookies.get("hello-friend-ng-mode")
      ? Cookies.get("hello-friend-ng-mode")
      : data.default

  const [mode, setMode] = useState(defaultMode)

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light"
    Cookies.set("hello-friend-ng-mode", newMode)
    setMode(newMode)
  }

  return [mode, toggleMode, allowChange]
}

const useIsMobile = () => {
  /*
    Returns true if the site is viewed on mobile, based on the media query
    saved as "--phoneWidth" in src/assets/scss/_variables.scss.
  */
  const mobileQuery = getComputedStyle(document.body).getPropertyValue(
    "--phoneWidth"
  )
  const isMobile = () => window.matchMedia(mobileQuery).matches

  const [mobile, setMobile] = useState(isMobile())

  useEffect(() => {
    const setMobileOnResize = () => setMobile(isMobile())
    window.addEventListener("resize", setMobileOnResize)
    return () => window.removeEventListener("resize", setMobileOnResize)
  })

  return mobile
}

export { useModeToggle, useIsMobile }

import { useState } from "react"
import Cookies from "js-cookie"

const useModeToggle = (data) => {
  /*
    Returns current theme mode ("light" or "dark"), theme mode toggle function
    and a boolean for if the theme mode toggle is to be allowed.
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

export default useModeToggle

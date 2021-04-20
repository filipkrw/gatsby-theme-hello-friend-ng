import { useState, useEffect } from "react"

const toggleBodyClass = () => {
  if (document.body.classList.contains('dark-theme')) {
    document.body.classList.remove('dark-theme')
    localStorage.setItem("hello-friend-ng-mode", "light")
    return "light"
  } else {
    document.body.classList.add('dark-theme')
    localStorage.setItem("hello-friend-ng-mode", "dark")
    return "dark"
  }
}

const useModeToggle = (data) => {
  const [currentMode, setCurrentMode] = useState("dark")

  const toggleMode = () => {
    const newMode = toggleBodyClass()
    setCurrentMode(newMode)
  }

  useEffect(() => {
    // No saved theme mode preference in localStorage, and default mode is set to dark - add 'dark-theme' class to body
    // Happens only on first load
    if (typeof window !== 'undefined'
        && !localStorage.getItem("hello-friend-ng-mode")
        && data.default === "dark") {
      toggleMode()
    }

    if (!document.body.classList.contains("dark-theme")) {
      setCurrentMode("light")
    }
  }, [])
  
  return [currentMode, toggleMode, data.allowChange]
}

export default useModeToggle

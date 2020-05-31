import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import HamburgerMenuIcon from "../icons/hamburger-menu"

const Menu = () => {
  const isMobile = useIsMobile()

  const [showMenu, setShowMenu] = useState(!isMobile)
  const [showMenuTrigger, setShowMenuTrigger] = useState(isMobile)

  useEffect(() => {
    setShowMenu(!isMobile)
    setShowMenuTrigger(isMobile)
  }, [isMobile])

  const handleClick = () => {
    if (showMenuTrigger) {
      setShowMenu(!showMenu)
    }
  }

  return (
    <>
      <nav className={showMenu ? "menu" : "hidden"}>
        <ul className="menu__inner">
          <li>
            <Link to="/posts">Blog</Link>
          </li>
          <li>
            <Link to="/works">Works</Link>
          </li>
        </ul>
      </nav>

      <span
        className={showMenuTrigger ? "menu-trigger" : "hidden"}
        onClick={handleClick}
      >
        <HamburgerMenuIcon />
      </span>
    </>
  )
}

function useIsMobile() {
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

export default Menu

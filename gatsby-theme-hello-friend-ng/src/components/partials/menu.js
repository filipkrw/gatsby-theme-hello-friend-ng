import React, { useState, useEffect, useContext } from "react"

import MediaQueryContext from "../../context/media-query-context"

import MenuLinksTemplate from "../../templates/menu-links"
import HamburgerMenuIcon from "../icons/hamburger-menu"

const Menu = ({ spaceForThemeToggler }) => {
  const { mediaQueryMatch } = useContext(MediaQueryContext)
  const isMobile = mediaQueryMatch === "--phoneWidth"

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
        <ul
          className={
            spaceForThemeToggler ? "menu__inner" : "menu__inner stretch"
          }
        >
          <MenuLinksTemplate />
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

export default Menu

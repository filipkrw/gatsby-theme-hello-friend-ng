import React, { useState, useEffect } from "react"
import useIsMobile from "../../hooks/useIsMobile"

import MenuLinksTemplate from "../../templates/menu-links"
import HamburgerMenuIcon from "../icons/hamburger-menu"

const Menu = ({ spaceForThemeToggler }) => {
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

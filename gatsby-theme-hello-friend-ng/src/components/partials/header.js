import React from "react"
import Logo from "./logo"

import MenuTemplate from "../../templates/menu"
import ThemeIcon from "../icons/theme"

const Header = ({ toggleDarkMode, menuLinks }) => {
  return (
    <header className="header">
      <span className="header__inner">
        <Logo />

        <span className="header__right">
          <MenuTemplate />

          <span className="theme-toggle unselectable">
            <ThemeIcon onClick={toggleDarkMode} />
          </span>
        </span>
      </span>
    </header>
  )
}

export default Header

import React from "react"

import Logo from "./logo"
import Menu from "./menu"
import ThemeIcon from "./icons/theme"

const Header = ({ toggleDarkMode }) => {
  return (
    <header className="header">
      <span className="header__inner">
        <Logo />

        <span className="header__right">
          <Menu />

          <span className="theme-toggle unselectable">
            <ThemeIcon onClick={toggleDarkMode} />
          </span>
        </span>
      </span>
    </header>
  )
}

export default Header

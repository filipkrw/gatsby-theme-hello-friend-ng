import React from "react"

import LogoTemplate from "../../templates/logo"
import Menu from "./menu"
import ThemeIcon from "../icons/theme"

const Header = ({ toggleMode, allowChange }) => {
  return (
    <header className="header">
      <span className="header__inner">
        <LogoTemplate />

        <span className="header__right">
          <Menu spaceForThemeToggler={allowChange} />

          {allowChange && (
            <span className="theme-toggle unselectable">
              <ThemeIcon onClick={toggleMode} />
            </span>
          )}
        </span>
      </span>
    </header>
  )
}

export default Header

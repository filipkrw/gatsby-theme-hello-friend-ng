import React, { useContext } from "react"

import LogoTemplate from "../../templates/logo"
import Menu from "./menu"
import ThemeIcon from "../icons/theme"

import ThemeContext from "../../context/theme-context"

const Header = () => {
  const { toggleMode, allowChange } = useContext(ThemeContext)

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

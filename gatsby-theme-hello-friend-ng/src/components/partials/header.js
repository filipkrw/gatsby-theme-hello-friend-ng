import React from "react"

import Logo from "./logo"
import Menu from "./menu"
import ThemeIcon from "./theme-icon"

const Header = ({ toggleDarkMode }) => {
  return (
    <header className="header">
      <span className="header__inner">
        <Logo />

        <span className="header__right">
          <Menu />

          <span className="menu-trigger" style={{ display: "none" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </span>

          <span className="theme-toggle unselectable">
            <ThemeIcon onClick={toggleDarkMode} />
          </span>
        </span>
      </span>
    </header>
  )
}

export default Header

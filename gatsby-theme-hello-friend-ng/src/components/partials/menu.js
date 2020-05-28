import React from "react"
import { Link } from "gatsby"

const Menu = (props) => {
  return (
    <nav className="menu">
      <ul className="menu__inner">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Menu

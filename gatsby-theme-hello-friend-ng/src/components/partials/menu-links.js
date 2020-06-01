import React from "react"
import { Link } from "gatsby"

const MenuLinks = ({ items }) => {
  return (
    <>
      {items &&
        items.map((item) => (
          <li>
            <Link to={item.link}>{item.name}</Link>
          </li>
        ))}
    </>
  )
}

export default MenuLinks

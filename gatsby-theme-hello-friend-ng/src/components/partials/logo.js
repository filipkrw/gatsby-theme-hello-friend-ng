import React from "react"
import { Link } from "gatsby"

const Logo = ({ text, mark, cursor, img }) => {
  return (
    <Link to={"/"} style={{ textDecoration: "none" }}>
      <div className="logo">
        {img ? (
          <img src={img.src} alt={img.alt} />
        ) : (
          <>
            {mark && <span className="logo__mark">></span>}
            {text && <span className="logo__text">{text}</span>}
            {cursor && <span className="logo__cursor" />}
          </>
        )}
      </div>
    </Link>
  )
}

export default Logo

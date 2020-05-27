import React from "react"
import { Link } from "gatsby"

const Logo = (props) => {
  return (
    <Link to={"/"} style={{ textDecoration: "none" }}>
      <div className="logo">
        {/*{{ if .Site.Params.Logo.path }}
                <img src="{{ .Site.Params.Logo.path }}" alt="{{ .Site.Params.Logo.alt }}" />
            {{ else }}
        <span className="logo__mark">></span>*/}
        <span className="logo__text">hello</span>
        <span className="logo__cursor"></span>
      </div>
    </Link>
  )
}

export default Logo

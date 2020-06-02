import React from "react"

const Footer = ({ children }) => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__content">{children}</div>
      </div>
    </footer>
  )
}

export default Footer

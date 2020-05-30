import React from "react"

const Footer = (props) => {
  const authorName = "Filip Krawczyk"

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__content">
          <span>&copy; 2020</span>
          Made by
          {authorName && (
            <span>
              <a href="http://github.com/atmhrt">{authorName}</a>
            </span>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer

import React from "react"

const Footer = (props) => {
  const authorName = "Filip Krawczyk"

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__content">
          <span>&copy; 2020</span>
          {authorName && (
            <span>
              <a href="/">{authorName}</a>
            </span>
          )}
          <span>Site Copyright</span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-rss"
            >
              <path d="M4 11a9 9 0 0 1 9 9"></path>
              <path d="M4 4a16 16 0 0 1 16 16"></path>
              <circle cx="5" cy="19" r="1"></circle>
            </svg>
          </span>
        </div>
      </div>
      <div className="footer__inner">
        <div className="footer__content">
          <span>
            Powered by <a href="http://gohugo.io">Gatsby</a>
          </span>
          <span>
            Made with &#10084; by{" "}
            <a href="https://github.com/rhazdon">Filip Krawczyk</a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer

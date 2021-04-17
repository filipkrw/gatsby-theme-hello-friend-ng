import React from "react"
import Footer from "../components/partials/footer"

const FooterTemplate = () => {
  return (
    <Footer>
      <span>&copy; 2021</span>
      <span>
        Made by <a href="https://github.com/filipkrw">Filip Krawczyk</a>
      </span>
      <span>Powered by <a href="https://www.gatsbyjs.com/">Gatsby</a></span>
    </Footer>
  )
}

export default FooterTemplate

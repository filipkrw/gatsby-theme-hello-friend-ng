import React from "react"
import SocialIcon from "../icons/social"

const Socials = ({ socials }) => {
  return (
    <div>
      {socials.map((social, i) => (
        <a
          key={i}
          href={social.url}
          target="_blank"
          rel="noreferrer"
          title={social.title}
          className="social-icon"
        >
          <SocialIcon icon={social.icon} />
        </a>
      ))}
    </div>
  )
}

export default Socials

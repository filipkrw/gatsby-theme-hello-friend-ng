import React from "react"
import PostImage from "./post-image"

import LinkImage from "./link-image"

import TagIcon from "../icons/tag"
import ExternalLinkIcon from "../icons/external-link"

const Project = ({ title, image, description, tech, links }) => {
  return (
    <div class="project-info">
      {image && <LinkImage src={image.src} url={image.url} title={title} />}
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="post-info">
        {tech && (
          <p>
            <TagIcon />
            {tech.join(", ")}
          </p>
        )}
        {links && (
          <p>
            <ExternalLinkIcon />
            {links.map((link, i) => (
              <span>
                <a
                  href={link.url}
                  title={link.title}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.title}
                </a>
                {i < links.length - 1 && ", "}
              </span>
            ))}
          </p>
        )}
      </div>
    </div>
  )
}

export default Project

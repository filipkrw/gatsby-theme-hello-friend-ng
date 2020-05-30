import React from "react"
import Project from "./partials/project"

const Works = ({ content }) => {
  const project1 = {
    title: "Project title",
    image: {
      src: "https://i.imgur.com/b5bBrYX.png",
      url: "#",
    },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a purus velit. Suspendisse lorem neque, mollis ac ultricies quis, convallis at massa. Maecenas pharetra arcu vel maximus facilisis. Aenean faucibus rhoncus ligula eget pharetra. Fusce vitae erat molestie, tempus risus sit amet, porta neque. Nunc semper tortor sed iaculis rutrum. Etiam volutpat, lacus et dapibus faucibus, neque felis dignissim urna, in aliquam lacus magna sit amet risus.",
    tech: ["JavaScript", "React", "Gatsby"],
    links: [
      {
        title: "Demo",
        url: "#",
      },
    ],
  }

  // <h1>Works</h1>
  // <Project {...project1} />

  return <main className="post">{content}</main>
}

export default Works

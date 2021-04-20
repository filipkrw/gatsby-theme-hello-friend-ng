import React from "react"
import { MDXProvider } from "@mdx-js/react"

import Image from "./partials/image"
import LinkImage from "./partials/link-image"
import ImageExternal from "./partials/image-external"
import CodeHighlight from "./partials/code-highlight"
import Socials from "./partials/socials"
import ProjectInfo from "./partials/project-info"


const Shortcodes = ({ children }) => {
	const components = {
		Image,
		LinkImage,
		ImageExternal,
		CodeHighlight,
		Socials,
		ProjectInfo
	}

	return (
		<MDXProvider components={components}>{children}</MDXProvider>
	)
}

export default Shortcodes
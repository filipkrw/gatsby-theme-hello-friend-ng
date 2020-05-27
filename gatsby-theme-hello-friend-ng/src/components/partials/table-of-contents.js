import React from "react"

const TableOfContents = () => {
  return (
    <>
      <aside id="toc">
        <div className="toc-title">Table of contents</div>

        <nav id="TableOfContents">
          <ul>
            <li>
              <a href="#intro">Intro</a>
              <ul>
                <li>
                  <a href="#subsection">Subsection</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>
      <hr />
    </>
  )
}

export default TableOfContents

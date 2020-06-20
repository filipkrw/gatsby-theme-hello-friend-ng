// import { useState, useEffect } from "react"
//
// const useIsMobile = () => {
//   /*
//     Returns true if the site is viewed on mobile, based on the media query
//     saved as "--phoneWidth" in src/assets/scss/_variables.scss.
//   */
//   const mobileQuery = getComputedStyle(document.body).getPropertyValue(
//     "--phoneWidth"
//   )
//   const isMobile = () => window.matchMedia(mobileQuery).matches
//
//   const [mobile, setMobile] = useState(isMobile())
//
//   useEffect(() => {
//     const handleSetMobile = () => setMobile(isMobile())
//     window.addEventListener("resize", handleSetMobile)
//     return () => window.removeEventListener("resize", handleSetMobile)
//   })
//
//   return mobile
// }
//
// export default useIsMobile

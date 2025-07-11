// "use client"

// import { useResizeObserver } from "@wojtekmaj/react-hooks"
// import type { PDFDocumentProxy } from "pdfjs-dist"
// import { useCallback, useState } from "react"
// import { Document, Page, pdfjs } from "react-pdf"
// import "react-pdf/dist/esm/Page/AnnotationLayer.css"
// import "react-pdf/dist/esm/Page/TextLayer.css"
// import "./Sample.css"

// pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString()

// const options = {
//   cMapUrl: "/cmaps/",
//   standardFontDataUrl: "/standard_fonts/",
// }

// const resizeObserverOptions = {}

// const maxWidth = 800

// type PDFFile = string | File | null

// export default function Sample() {
//   const [file, setFile] = useState<PDFFile>("./1.pdf")
//   const [numPages, setNumPages] = useState<number>()
//   const [containerRef, setContainerRef] = useState<HTMLElement | null>(null)
//   const [containerWidth, setContainerWidth] = useState<number>()

//   const onResize = useCallback<ResizeObserverCallback>((entries) => {
//     const [entry] = entries

//     if (entry) {
//       setContainerWidth(entry.contentRect.width)
//     }
//   }, [])

//   useResizeObserver(containerRef, resizeObserverOptions, onResize)

//   function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
//     const { files } = event.target

//     const nextFile = files?.[0]

//     if (nextFile) {
//       setFile(nextFile)
//     }
//   }

//   function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
//     setNumPages(nextNumPages)
//   }

//   return (
//     <div className="Example">
//       <header>
//         <h1>react-pdf sample page</h1>
//       </header>
//       <div className="Example__container">
//         <div className="Example__container__load">
//           <label htmlFor="file">Load from file:</label> <input onChange={onFileChange} type="file" />
//         </div>
//         <div className="Example__container__document" ref={setContainerRef}>
//           <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
//             {Array.from(new Array(numPages), (el, index) => (
//               <Page
//                 key={`page_${index + 1}`}
//                 pageNumber={index + 1}
//                 width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
//               />
//             ))}
//           </Document>
//         </div>
//       </div>
//     </div>
//   )
// }

/**
 * ThumbnailView component is responsible for rendering the thumbnails of the PDF pages.
 * It uses the pdfjs library to render the thumbnails of the PDF pages.
 * It also listens to the scroll event of the PDF container to update the current page based on the scroll position.
 *
 * @component
 * @param {number} page - The current page number.
 * @param {number} pages - The total number of pages in the PDF.
 * @param {function} goToPage - A function to navigate to a specific page.
 * @param {object} pdfWrapper - A reference to the PDF container.
 * @param {number} numPages - The total number of pages in the PDF.
 * @param {object} fileDetails - Details of the PDF file.
 * @returns {JSX.Element} - The ThumbnailView component.
 */

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";


const ThumbnailView = ({
  page,
  pages,
  goToPage,
  pdfWrapper,
  numPages,
  fileDetails,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    fetchThumbnails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numPages]);

  const fetchThumbnails = async () => {
    setLoading(true);
    const thumbnailArray = [];
    for (let i = 1; i <= numPages; i++) {
      const pdfPage = fileDetails.file;
      const page = await pdfPage.getPage(i);
      const viewport = page.getViewport({ scale: 0.5 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport }).promise;
      const thumbnailUrl = canvas.toDataURL("image/png");
      thumbnailArray.push(thumbnailUrl);
    }
    setThumbnails(thumbnailArray);
    setLoading(false);
  };

  // Add scroll event listener to update current page based on scroll position
  useEffect(() => {
    function handleScroll(e) {
      updateCurrentPage(e.target.scrollTop);
    }

    if (!pdfWrapper) return;

    const pdfContainer = pdfWrapper.current;
    pdfContainer.addEventListener("scroll", handleScroll);
    return () => {
      pdfContainer.removeEventListener("scroll", handleScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfWrapper]);

  function updateCurrentPage(scrollTop) {
    const pageHeight = pdfWrapper.current.clientHeight;
    const currentPage =
      Math.floor((scrollTop + pageHeight / 2) / pageHeight) + 1;
    setCurrentPage(currentPage);
  }

  function onPageLoadSuccess(page) {
    console.log("Paginas", page);
  }

  return (
    <>
      <div className="md:block hidden max-w-[189px] relative rounded-md">
        <div className="h-full">
          <ul className="w-full flex-col gap-4 items-center max-w-[173px] h-full flex justify-start">
            {loading ? (
              <p className="text-gray-500 group-hover:text-purple-700 transition duration-75 capitalize">
                Loading thumbnails...
              </p>
            ) : (
              thumbnails.map((thumbnail, index) => {
                return (
                  <li
                    className={
                      index === Number(page)
                      ? 'border w-2/3 h-auto border-green-500 rounded-md bg-green-500 '
                        : 'border border-gray-1000 rounded-md bg-gray-200  '
                    }
                    key={index}
                  >
                    <button onClick={() => goToPage(index)}>
                      <Image
                        src={thumbnail}
                        alt={`Page ${index + 1}`}
                        width={141}
                        height={170}
                        className={
                          index === Number(page)
                            ? "w-auto h-auto border-green-600 rounded"                            : ""
                        }
                      />
                      <span className={`text-gray-500 group-hover:text-purple-700 transition duration-75 capitalize block 
                      ${index === Number(page)? 'text-white': 'text-black'}
                      `}>
                        Page {index + 1}
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ThumbnailView;

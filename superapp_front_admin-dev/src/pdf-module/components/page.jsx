'use client'
import React, { useEffect, useRef, useState } from 'react';

/*
*The Page component is a functional component that renders a PDF page.
*The component uses the useRef and useState hooks to create a reference to the canvas and to manage the width and height of the page.
*The component uses the useEffect hook to render the page when the component mounts.
*The component uses the canvasRef to get the canvas context and to render the page.
*The component uses the width and height state variables to set the width and height of the page.
*The component uses the updateDimensions function to update the dimensions of the page.
*/

const Page = ({ page, dimensions, updateDimensions }) => {
  const canvasRef = useRef();
  const [width, setWidth] = useState((dimensions && dimensions.width) || 0);
  const [height, setHeight] = useState((dimensions && dimensions.height) || 0);

  useEffect(() => {
    const renderPage = async (p) => {
      const _page = await p;
      if (_page) {
        const context = canvasRef.current?.getContext('2d');
        const viewport = _page.getViewport({ scale: 1 });

        setWidth(viewport.width);
        setHeight(viewport.height);

        if (context) {
          await _page.render({
            canvasContext: canvasRef.current?.getContext('2d'),
            viewport,
          }).promise;

          const newDimensions = {
            width: viewport.width,
            height: viewport.height,
          };

          updateDimensions(newDimensions);
        }
      }
    };

    renderPage(page);
  }, [page, updateDimensions]);

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};

export { Page };

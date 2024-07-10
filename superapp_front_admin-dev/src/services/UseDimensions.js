'use client' // This is a client component 👈🏽

import * as React from "react";

export default function UseDimensions() {
  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
    height: undefined,
  });

  React.useEffect(() => {
    if(window) {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      function handleResize() {
        if (typeof window !== "undefined") {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }
      }
  
      window.addEventListener("resize", handleResize);
      handleResize();
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
    return null
  }, []);

  return windowSize;
}
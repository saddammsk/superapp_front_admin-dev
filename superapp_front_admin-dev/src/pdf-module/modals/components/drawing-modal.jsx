"use client";
/**
 * @file DrawingModal component for adding a signature.
 * @module DrawingModal
 */

import React, { useState, createRef, useEffect } from "react";
import { Color } from "../../entities";

/**
 * DrawingModal component for adding a signature.
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Flag indicating if the modal is open.
 * @param {Function} props.dismiss - Function to dismiss the modal.
 * @param {Function} props.confirm - Function to confirm and save the signature.
 * @param {Object} props.drawing - The existing drawing object.
 * @returns {JSX.Element} The DrawingModal component.
 */
export const DrawingModal = ({ open, dismiss, confirm, drawing }) => {
  // Component state and refs
  const svgRef = createRef();
  const [paths, setPaths] = useState([]);
  const [path, setPath] = useState((drawing && drawing.path) || "");
  const [svgX, setSvgX] = useState(0);
  const [svgY, setSvgY] = useState(0);
  const [minX, setMinX] = useState(Infinity);
  const [maxX, setMaxX] = useState(0);
  const [minY, setMinY] = useState(Infinity);
  const [maxY, setMaxY] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [stroke, setStroke] = useState(Color.BLACK);
  const [strokeDropdownOpen, setStrokeDropdownOpen] = useState(false);

  /**
   * Updates the SVG coordinates when the component mounts or the SVG ref changes.
   */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const { x, y } = svg.getBoundingClientRect();
    setSvgX(x);
    setSvgY(y);
  }, [svgRef]);

  /**
   * Handles the mouse down event on the SVG element.
   * @param {Object} event - The mouse down event.
   */
  const handleMouseDown = (event) => {
    event.preventDefault();
    setMouseDown(true);

    const x = event.clientX - svgX;
    const y = event.clientY - svgY;
    setMinX(Math.min(minX, x));
    setMaxX(Math.max(maxX, x));
    setMinY(Math.min(minY, y));
    setMaxY(Math.max(maxY, y));
    setPath(path + `M${x},${y}`);
    setPaths([...paths, ["M", x, y]]);
  };

  /**
   * Handles the mouse move event on the SVG element.
   * @param {Object} event - The mouse move event.
   */
  const handleMouseMove = (event) => {
    event.preventDefault();
    if (!mouseDown) return;

    const x = event.clientX - svgX;
    const y = event.clientY - svgY;
    setMinX(Math.min(minX, x));
    setMaxX(Math.max(maxX, x));
    setMinY(Math.min(minY, y));
    setMaxY(Math.max(maxY, y));
    setPath(path + `L${x},${y}`);
    setPaths([...paths, ["L", x, y]]);
  };

  /**
   * Handles the mouse up event on the SVG element.
   * @param {Object} event - The mouse up event.
   */
  const handleMouseUp = (event) => {
    event.preventDefault();
    setMouseDown(false);
  };

  /**
   * Resets the drawing board to its initial state.
   */
  const resetDrawingBoard = () => {
    setPaths([]);
    setPath("");
    setMinX(Infinity);
    setMaxX(0);
    setMinY(Infinity);
    setMaxY(0);
    setStrokeWidth(2);
    setStroke(Color.BLACK);
  };

  /**
   * Handles the "Done" button click event.
   * If there are no paths, calls the confirm function.
   * Otherwise, calculates the bounding box and calls the confirm function with the signature data.
   */
  const handleDone = () => {
    if (!paths.length) {
      confirm();
      return;
    }

    const boundingWidth = maxX - minX;
    const boundingHeight = maxY - minY;

    const dx = -(minX - 10);
    const dy = -(minY - 10);

    confirm({
      stroke,
      strokeWidth,
      width: boundingWidth + 20,
      height: boundingHeight + 20,
      path: paths.reduce(
        (fullPath, lineItem) =>
          `${fullPath}${lineItem[0]}${lineItem[1] + dx}, ${lineItem[2] + dy}`,
        ""
      ),
    });

    closeModal();
  };

  /**
   * Closes the modal and resets the drawing board.
   */
  const closeModal = () => {
    resetDrawingBoard();
    dismiss();
  };

  // TODO: Move to config
  const strokeSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  /**
   * Handles the stroke color selection.
   * @param {string} color - The selected color.
   */
  const handleStrokeSelect = (color) => () => {
    setStroke(color);
    setStrokeDropdownOpen(false);
  };

  return (
    <div
      className={`fixed inset-0 overflow-y-auto ${open ? "block" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-500"
            style={{ opacity: 0.5 }}
          ></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="xl:w-1/4 md:w-1/2 inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-1/2">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Add your Signature
            </h3>
            <div className="mt-4">
              {/* <div className="fsm:grid sm:grid-cols-1 sm:gap-4">
                <div className="sm:grid sm:grid-cols-1">
                  <span className="text-sm font-medium text-gray-700">
                    Tools
                  </span>
                </div>
                <div className="flex sm:grid sm:grid-cols-2 sm:gap-4 sm:items-start">
                  <div className="relative mt-1 rounded-md">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    >
                      {strokeWidth}
                    </button>
                  </div>
                  <div className="mt-1 relative">
                    <span
                      className="inline-block w-10 h-10 rounded-full cursor-pointer bg-red-500"
                      onClick={() => setStrokeDropdownOpen(true)}
                    ></span>
                    {strokeDropdownOpen && (
                      <div className="absolute z-10 mt-2 w-36 px-2 py-2 bg-white border rounded shadow-lg">
                        <div className="grid grid-cols-3 gap-1">
                          {Object.values(Color).map((color, index) => (
                            <span
                              key={index}
                              className="inline-block w-6 h-6 rounded-full cursor-pointer border-2 border-white"
                              style={{ backgroundColor: color }}
                              onClick={() => handleStrokeSelect(color)}
                            ></span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div> */}
              <div className="mt-4">
                <div
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                >
                  <svg ref={svgRef} className="w-full h-1/2">
                    <path
                      strokeWidth={strokeWidth}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      stroke={stroke}
                      fill="none"
                      d={path}
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleDone}
            >
              <span>Done</span>
              <svg
                className="h-5 w-5 text-white mx-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

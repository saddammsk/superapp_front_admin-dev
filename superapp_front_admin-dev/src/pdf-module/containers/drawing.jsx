/**
 * Represents a Drawing component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.id - The ID of the drawing.
 * @param {number} props.x - The x-coordinate of the drawing.
 * @param {number} props.y - The y-coordinate of the drawing.
 * @param {number} props.width - The width of the drawing.
 * @param {number} props.height - The height of the drawing.
 * @param {string} props.stroke - The stroke color of the drawing.
 * @param {number} props.strokeWidth - The stroke width of the drawing.
 * @param {string} props.path - The path of the drawing.
 * @param {number} props.pageWidth - The width of the page.
 * @param {number} props.pageHeight - The height of the page.
 * @param {Function} props.removeDrawing - The function to remove the drawing.
 * @param {Function} props.updateDrawingAttachment - The function to update the drawing attachment.
 * @param {string} props.assigneeName - The name of the assignee.
 * @param {Function} props.addSignature - The function to add a signature.
 * @param {Function} props.setPlaceholderId - The function to set the placeholder ID.
 * @param {String} selectedElement - Currently selected placeholder id
 * @returns {JSX.Element} The Drawing component.
 */

import React, { createRef, useEffect, useState } from 'react';
import { DragActions } from '@/pdf-module/entities';
import { getMovePosition } from '@/pdf-module/utils/helpers';
import { Drawing as DrawingComponent } from '@/pdf-module/components/drawing';

const Drawing = ({
  id,
  x,
  y,
  width,
  height,
  stroke,
  strokeWidth,
  path,
  pageWidth,
  pageHeight,
  removeDrawing,
  updateDrawingAttachment,
  assigneeName,
  addSignature,
  setPlaceholderId,
  selectedElement,
}) => {
  const svgRef = createRef();
  const [mouseDown, setMouseDown] = useState(false);
  const [positionTop, setPositionTop] = useState(y);
  const [positionLeft, setPositionLeft] = useState(x);
  const [operation, setOperation] = useState(DragActions.NO_MOVEMENT);
  const [dimmerActive, setDimmerActive] = useState(false);

  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    }
  }, [svgRef, width, height]);

  const handleMousedown = (event) => {
    setMouseDown(true);
    setOperation(DragActions.MOVE);

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event) => {
    event.preventDefault();

    if (mouseDown) {
      const { top, left } = getMovePosition(
        positionLeft,
        positionTop,
        event.movementX,
        event.movementY,
        width,
        height,
        pageWidth,
        pageHeight
      );

      setPositionTop(top);
      setPositionLeft(left);
    }
  };

  const handleMouseUp = (event) => {
    event.preventDefault();
    setMouseDown(false);
    // Remove event listeners
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);

    if (operation === DragActions.MOVE) {
      const { top, left } = getMovePosition(
        positionLeft,
        positionTop,
        event.movementX,
        event.movementY,
        width,
        height,
        pageWidth,
        pageHeight
      );

      updateDrawingAttachment({
        x: left,
        y: top,
      });
    }

    if (operation === DragActions.SCALE) {
      updateDrawingAttachment({
        x: positionLeft,
        y: positionTop,
      });
    }

    setOperation(DragActions.NO_MOVEMENT);
  };

  const handleMouseOut = (event) => {
    if (operation === DragActions.MOVE) {
      // handleMouseUp(event);
    }
  };

  const handleClick = () => setDimmerActive(true);
  const cancelDelete = () => setDimmerActive(false);

  const confirmDelete = () => {
    cancelDelete();
    removeDrawing();
  };
  return (
    <DrawingComponent
      id={id}
      stroke={stroke}
      strokeWidth={strokeWidth}
      path={path}
      width={width}
      svgRef={svgRef}
      height={height}
      onClick={handleClick}
      cancelDelete={cancelDelete}
      dimmerActive={dimmerActive}
      deleteDrawing={confirmDelete}
      handleMouseDown={handleMousedown}
      handleMouseMove={handleMouseMove}
      handleMouseOut={handleMouseOut}
      handleMouseUp={handleMouseUp}
      positionLeft={positionLeft}
      positionTop={positionTop}
      assigneeName={assigneeName}
      setPlaceholderId={setPlaceholderId}
      selectedElement={selectedElement}
    />
  );
};

export { Drawing };

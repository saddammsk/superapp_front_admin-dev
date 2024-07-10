/**
 * Represents the ImageStatic component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique identifier of the image.
 * @param {number} props.x - The x-coordinate of the image.
 * @param {number} props.y - The y-coordinate of the image.
 * @param {number} props.width - The width of the image.
 * @param {string} props.usage - The usage of the image.
 * @param {boolean} props.disabled - Indicates if the image is disabled.
 * @param {number} props.height - The height of the image.
 * @param {string} props.fontFamily - The font family of the image.
 * @param {number} props.pageHeight - The height of the page.
 * @param {number} props.pageWidth - The width of the page.
 * @param {Function} props.removeElement - The function to remove the image.
 * @param {Function} props.updateImageStaticAttachment - The function to update the image attachment.
 * @param {string} props.placeholderId - The placeholder identifier.
 * @param {string} props.assigneeName - The name of the assignee.
 * @param {Function} props.handleImageClick - The function to handle image click.
 * @param {Function} props.addSignature - The function to add a signature.
 * @param {Function} props.setPlaceholderId - The function to set the placeholder identifier.
 * @param {String} updateSelectedElement - Update currently selected placeholder id
 * @param {String} selectedElement - Currently selected placeholder id
 * @returns {JSX.Element} The ImageStatic component.
 */

import React, { useState, useRef } from 'react';
import { ImageStatic as Component } from '@/pdf-module/components/image-static';
import { getMovePosition } from '@/pdf-module/utils/helpers';
import { DragActions, TextMode } from '@/pdf-module/entities';

const ImageStatic = ({
  id,
  x,
  y,
  width,
  usage,
  disabled,
  height,
  fontFamily,
  pageHeight,
  pageWidth,
  removeElement,
  updateImageStaticAttachment,
  placeholderId,
  assigneeName,
  handleImageClick,
  addSignature,
  setPlaceholderId,
  details,
  updateSelectedElement,
  selectedElement,
  showMetadata
}) => {
  const inputRef = useRef(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseUp, setMouseUp] = useState(false);
  const [positionTop, setPositionTop] = useState(y);
  const [positionLeft, setPositionLeft] = useState(x);
  const [operation, setOperation] = useState(DragActions.NO_MOVEMENT);
  const [textMode, setTextMode] = useState(TextMode.COMMAND);

  const [lastMoveTime, setLastMoveTime] = useState(0);
  const throttleDelay = 1;

  /**
   * Handles the mouse move event.
   *
   * @param {MouseEvent} event - The mouse move event.
   */
  const handleMouseMove = (event) => {
    const currentTime = new Date().getTime();
    if (currentTime - lastMoveTime < throttleDelay) {
      return;
    }

    setLastMoveTime(currentTime);

    event.preventDefault();
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

      setPositionTop(top);
      setPositionLeft(left);
    }
  };

  React.useEffect(() => {
    /* Add event listener for mousemove when mouseDown is true and update the attachment position */
    if (mouseUp) updatePosition(positionTop, positionLeft);

    const onMouseMove = (event) => {
      handleMouseMove(event);
    };

    if (mouseDown) {
      document.addEventListener('mousemove', onMouseMove);
    } else {
      document.removeEventListener('mousemove', onMouseMove);
    }
    /* Add event listener for mouseup when mouseDown is true ; this will handle the move on out of focus event */
    if (mouseUp) {
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [mouseDown, operation, lastMoveTime]);

  const handleMouseDown = (event) => {
    setMouseUp(false);

    setMouseDown(true);
    setOperation(DragActions.MOVE);

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  /**
   * Updates the position of the image attachment.
   *
   * @param {number} t - The top position.
   * @param {number} l - The left position.
   */
  function updatePosition(t, l) {
    updateImageStaticAttachment({
      x: l,
      y: t,
    });
  }

  /**
   * Handles the mouse up event.
   *
   * @param {MouseEvent} event - The mouse up event.
   */
  const handleMouseUp = (event) => {
    setMouseUp(true);
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

      updateImageStaticAttachment({
        x: left,
        y: top,
      });
    }

    setOperation(DragActions.NO_MOVEMENT);
  };

  /**
   * Handles the mouse out event.
   *
   * @param {MouseEvent} event - The mouse out event.
   */
  const handleMouseOut = (event) => {
    if (operation === DragActions.MOVE) {
      // handleMouseUp(event);
    }
  };

  return (
    <Component
      id={id}
      usage={usage}
      disabled={disabled}
      width={width}
      height={height}
      mode={textMode}
      inputRef={inputRef}
      removeElement={removeElement}
      fontFamily={fontFamily}
      positionTop={positionTop}
      positionLeft={positionLeft}
      handleMouseUp={handleMouseUp}
      handleMouseOut={handleMouseOut}
      handleMouseDown={handleMouseDown}
      handleMouseMove={handleMouseMove}
      assigneeName={assigneeName}
      handleImageClick={handleImageClick}
      addSignature={addSignature}
      setPlaceholderId={setPlaceholderId}
      updateSelectedElement={updateSelectedElement}
      details={details}
      selectedElement={selectedElement}
      updateImageStaticAttachment={updateImageStaticAttachment}
      showMetadata={showMetadata}
    />
  );
};

export { ImageStatic };

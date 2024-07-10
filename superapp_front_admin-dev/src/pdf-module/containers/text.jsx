/**
 * Represents a text component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique identifier of the text component.
 * @param {number} props.x - The x-coordinate of the text component.
 * @param {number} props.y - The y-coordinate of the text component.
 * @param {string} props.text - The text content of the component.
 * @param {number} props.width - The width of the text component.
 * @param {boolean} props.disabled - Indicates if the text component is disabled.
 * @param {number} props.height - The height of the text component.
 * @param {number} props.lineHeight - The line height of the text component.
 * @param {number} props.size - The font size of the text component.
 * @param {string} props.fontFamily - The font family of the text component.
 * @param {number} props.pageHeight - The height of the page.
 * @param {number} props.pageWidth - The width of the page.
 * @param {Function} props.removeText - The function to remove the text component.
 * @param {Function} props.updateTextAttachment - The function to update the text attachment.
 * @param {string} props.placeholderId - The placeholder ID of the text component.
 * @param {Function} props.setPlaceholderId - The function to set the placeholder ID.
 * @param {string} props.assigneeName - The name of the assignee.
 * @returns {JSX.Element} The rendered Text component.
 */

import React, { useState, useRef } from 'react';
import { Text as Component } from '@/pdf-module/components/text';
import { getMovePosition } from '@/pdf-module/utils/helpers';
import { DragActions, TextMode } from '@/pdf-module/entities';

const Text = ({
  id,
  x,
  y,
  text,
  width,
  disabled,
  height,
  lineHeight,
  size,
  fontFamily,
  pageHeight,
  pageWidth,
  removeText,
  updateTextAttachment,
  placeholderId,
  setPlaceholderId,
  assigneeName,
  details,
  updateSelectedElement,
  selectedElement,
}) => {
  const inputRef = useRef(null);
  const [content, setContent] = useState(text || '');
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

    /* Add event listener for mousemove when mouseDown is true ; this will handle the move on focus event */
    const onMouseMove = (event) => {
      handleMouseMove(event);
    };

    /* Add event listener for mouseup when mouseDown is true ; this will handle the move on out of focus event */
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

  /**
   * Handles the mouse down event.
   *
   * @param {MouseEvent} event - The mouse down event.
   */
  const handleMouseDown = (event) => {
    setMouseUp(false);
    if (textMode !== TextMode.COMMAND) {
      return;
    }

    setMouseDown(true);
    setOperation(DragActions.MOVE);

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  /**
   * Updates the position of the text attachment.
   *
   * @param {number} t - The top position.
   * @param {number} l - The left position.
   */
  function updatePosition(t, l) {
    updateTextAttachment({
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

    if (textMode !== TextMode.COMMAND) {
      return;
    }

    // Remove event listeners
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);

    setMouseDown(false);

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

      updateTextAttachment({
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
    if (operation === DragActions.NO_MOVEMENT) {
      // Handle the mouse out event when there is no movement.
    }

    if (textMode === TextMode.INSERT) {
      setTextMode(TextMode.COMMAND);
      prepareTextAndUpdate();
    }
  };

  /**
   * Prepares the text and updates the text attachment.
   */
  const prepareTextAndUpdate = () => {
    // Deselect any selection when returning to command mode
    document.getSelection()?.removeAllRanges();

    const lines = [content];
    updateTextAttachment({
      lines,
      text: content,
    });
  };

  /**
   * Toggles the edit mode of the text component.
   */
  const toggleEditMode = () => {
    const input = inputRef.current;
    const mode =
      textMode === TextMode.COMMAND ? TextMode.INSERT : TextMode.COMMAND;

    setTextMode(mode);

    if (input && mode === TextMode.INSERT) {
      input.focus();
      input.select();
    } else {
      prepareTextAndUpdate();
    }
  };

  /**
   * Handles the change event of the text input.
   *
   * @param {ChangeEvent} event - The change event.
   */
  const onChangeText = (event) => {
    const value = event.currentTarget.value;
    setContent(value);
    // add text to attachment
    updateTextAttachment({ text: value });
  };

  return (
    <Component
      id={id}
      text={content}
      disabled={disabled}
      width={width}
      height={height}
      mode={textMode}
      size={size}
      lineHeight={lineHeight}
      inputRef={inputRef}
      removeText={removeText}
      fontFamily={fontFamily}
      positionTop={positionTop}
      onChangeText={onChangeText}
      positionLeft={positionLeft}
      handleMouseUp={handleMouseUp}
      toggleEditMode={toggleEditMode}
      handleMouseOut={handleMouseOut}
      handleMouseDown={handleMouseDown}
      handleMouseMove={handleMouseMove}
      placeholderId={placeholderId}
      setPlaceholderId={setPlaceholderId}
      assigneeName={assigneeName}
      details={details}
      updateSelectedElement={updateSelectedElement}
      selectedElement={selectedElement}
    />
  );
};

export { Text };

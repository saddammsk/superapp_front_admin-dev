/**
 * Renders a text view component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique identifier of the text view.
 * @param {number} props.x - The x-coordinate position of the text view.
 * @param {number} props.y - The y-coordinate position of the text view.
 * @param {string} props.text - The content of the text view.
 * @param {number} props.width - The width of the text view.
 * @param {number} props.height - The height of the text view.
 * @param {number} props.lineHeight - The line height of the text view.
 * @param {number} props.size - The font size of the text view.
 * @param {string} props.fontFamily - The font family of the text view.
 * @param {number} props.pageHeight - The height of the page.
 * @param {number} props.pageWidth - The width of the page.
 * @param {Function} props.removeTextView - The function to remove the text view.
 * @param {Function} props.updateTextViewAttachment - The function to update the position of the text view.
 * @param {string} props.assigneeName - The name of the assignee.
 * @param {Function} props.setPlaceholderId - The function to set the placeholder ID.
 * @param {String} selectedElement - Currently selected placeholder id
 * @returns {JSX.Element} The rendered text view component.
 */

import React, { useState, useRef } from 'react';
import { TextView as Component } from '@/pdf-module/components/text-view';
import { getMovePosition } from '@/pdf-module/utils/helpers';
import { DragActions, TextMode } from '@/pdf-module/entities';

const TextView = ({
  id,
  x,
  y,
  text,
  width,
  height,
  lineHeight,
  size,
  fontFamily,
  pageHeight,
  pageWidth,
  removeTextView,
  updateTextViewAttachment,
  assigneeName,
  setPlaceholderId,
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
    updateTextViewAttachment({
      x: l,
      y: t,
    });
  }

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

      updateTextViewAttachment({
        x: left,
        y: top,
      });
    }

    setOperation(DragActions.NO_MOVEMENT);
  };

  const handleMouseOut = (event) => {
    if (operation === DragActions.MOVE) {
      // handleMouseUp(event);
    }

    if (textMode === TextMode.INSERT) {
      setTextMode(TextMode.COMMAND);
      prepareTextAndUpdate();
    }
  };

  const prepareTextAndUpdate = () => {
    // Deselect any selection when returning to command mode
    document.getSelection()?.removeAllRanges();

    const lines = [content];
    updateTextViewAttachment({
      lines,
      text: content,
    });
  };

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

  const onChangeText = (event) => {
    const value = event.currentTarget.value;
    setContent(value);
  };

  return (
    <Component
      id={id}
      text={content}
      width={width}
      height={height}
      mode={textMode}
      size={size}
      lineHeight={lineHeight}
      inputRef={inputRef}
      removeTextView={removeTextView}
      fontFamily={fontFamily}
      positionTop={positionTop}
      onChangeText={onChangeText}
      positionLeft={positionLeft}
      handleMouseUp={handleMouseUp}
      toggleEditMode={toggleEditMode}
      handleMouseOut={handleMouseOut}
      handleMouseDown={handleMouseDown}
      handleMouseMove={handleMouseMove}
      assigneeName={assigneeName}
      setPlaceholderId={setPlaceholderId}
      selectedElement={selectedElement}
    />
  );
};

export { TextView };

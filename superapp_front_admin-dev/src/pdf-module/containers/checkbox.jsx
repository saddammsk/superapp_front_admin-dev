/**
 * Checkbox component for PDF module.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.id - The ID of the checkbox.
 * @param {number} props.x - The X coordinate of the checkbox.
 * @param {number} props.y - The Y coordinate of the checkbox.
 * @param {string} props.text - The text content of the checkbox.
 * @param {number} props.width - The width of the checkbox.
 * @param {number} props.height - The height of the checkbox.
 * @param {number} props.lineHeight - The line height of the checkbox.
 * @param {number} props.size - The font size of the checkbox.
 * @param {string} props.fontFamily - The font family of the checkbox.
 * @param {number} props.pageHeight - The height of the page.
 * @param {number} props.pageWidth - The width of the page.
 * @param {function} props.removeCheckBox - The function to remove the checkbox.
 * @param {function} props.updateCheckBoxAttachment - The function to update the checkbox attachment.
 * @param {string} props.assigneeName - The name of the assignee.
 * @param {function} props.setPlaceholderId - The function to set the placeholder ID.
 * @param {boolean} props.disabled - Whether the checkbox is disabled.
 * @returns {JSX.Element} The rendered Checkbox component.
 */

import React, { useState, useRef } from 'react';
import { CheckBox as Component } from '@/pdf-module/components/checkbox';
import { getMovePosition } from '@/pdf-module/utils/helpers';
import { DragActions, TextMode } from '@/pdf-module/entities';

const CheckBox = ({
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
  removeCheckBox,
  updateCheckBoxAttachment,
  assigneeName,
  setPlaceholderId,
  disabled,
  selectedElement,
  updateSelectedElement,
}) => {
  const inputRef = useRef(null);
  const [checked, setChecked] = useState(text || '');
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

  const handleMousedown = (event) => {
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
    updateCheckBoxAttachment({
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

      updateCheckBoxAttachment({
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
      //prepareTextAndUpdate();
    }
  };

  const prepareTextAndUpdate = () => {
    // Deselect any selection when returning to command mode
    document.getSelection()?.removeAllRanges();

    const lines = [checked];
    updateCheckBoxAttachment({
      lines,
      checked: content,
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

  const onCheckedChange = (event) => {
    const value = event.currentTarget.checked;
    setChecked(value);
  };

  return (
    <Component
      id={id}
      checked={checked}
      width={width}
      height={height}
      mode={textMode}
      size={size}
      removeCheckBox={removeCheckBox}
      lineHeight={lineHeight}
      inputRef={inputRef}
      fontFamily={fontFamily}
      positionTop={positionTop}
      onCheckedChange={onCheckedChange}
      positionLeft={positionLeft}
      handleMouseUp={handleMouseUp}
      toggleEditMode={toggleEditMode}
      handleMouseOut={handleMouseOut}
      handleMouseDown={handleMousedown}
      handleMouseMove={handleMouseMove}
      assigneeName={assigneeName}
      setPlaceholderId={setPlaceholderId}
      disabled={disabled}
      selectedElement={selectedElement}
      updateSelectedElement={updateSelectedElement}
    />
  );
};

export { CheckBox };

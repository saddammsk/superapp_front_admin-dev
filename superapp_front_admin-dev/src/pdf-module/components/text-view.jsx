/**
 * Renders a text view component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique identifier of the text view.
 * @param {string} props.text - The text content of the text view.
 * @param {number} props.width - The width of the text view.
 * @param {number} props.height - The height of the text view.
 * @param {React.Ref} props.inputRef - The reference to the input element.
 * @param {string} props.mode - The mode of the text view.
 * @param {number} props.size - The font size of the text view.
 * @param {string} props.fontFamily - The font family of the text view.
 * @param {number} props.positionTop - The top position of the text view.
 * @param {number} props.positionLeft - The left position of the text view.
 * @param {Function} props.onChangeText - The callback function for text change event.
 * @param {Function} props.toggleEditMode - The callback function to toggle edit mode.
 * @param {Function} props.handleMouseDown - The callback function for mouse down event.
 * @param {Function} props.handleMouseMove - The callback function for mouse move event.
 * @param {Function} props.handleMouseOut - The callback function for mouse out event.
 * @param {Function} props.handleMouseUp - The callback function for mouse up event.
 * @param {number} props.lineHeight - The line height of the text view.
 * @param {Function} props.removeTextView - The callback function to remove the text view.
 * @param {string} props.assigneeName - The name of the assignee.
 * @param {Function} props.setPlaceholderId - The callback function to set the placeholder ID.
 * @param {String} selectedElement - Currently selected placeholder id
 * @returns {JSX.Element} The rendered text view component.
 */
import React from 'react';
import UserSelection from './user-selection';
import DraggableActions from './draggable-actions';

const TextView = ({
  id,
  text,
  width,
  height,
  inputRef,
  mode,
  size,
  fontFamily,
  positionTop,
  positionLeft,
  onChangeText,
  toggleEditMode,
  handleMouseDown,
  handleMouseMove,
  handleMouseOut,
  handleMouseUp,
  lineHeight,
  removeTextView,
  assigneeName,
  setPlaceholderId,
  selectedElement,
}) => {
  // handle highlighting upon focus
  const isHighlighted = selectedElement === id;

  return (
    <div className=' border-gray-400' onClick={() => setPlaceholderId(id)}>
      <div
        onDoubleClick={toggleEditMode}
        className={`pdf-element-drag-outer ${
          isHighlighted && 'highlight-placeholder'
        } absolute `}
        style={{
          backgroundColor: '#faffc9',
          width: `${width}px`,
          height: `${height}px`,
          fontFamily: fontFamily,
          fontSize: `${size}px`,
          cursor: mode === 'COMMAND' ? 'move' : 'default',
          top: `${positionTop}px`,
          left: `${positionLeft}px`,
        }}
      >
        <span className=''>{text}</span>
        <DraggableActions
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          handleMouseOut={handleMouseOut}
          remove={removeTextView}
          assigneeName={assigneeName}
        />
      </div>
    </div>
  );
};

export { TextView };

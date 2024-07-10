/**
 * Represents a text component in the PDF module.
 * @component
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique identifier of the text component.
 * @param {string} props.text - The text content of the component.
 * @param {number} props.width - The width of the component.
 * @param {boolean} props.disabled - Indicates if the component is disabled.
 * @param {number} props.height - The height of the component.
 * @param {React.Ref} props.inputRef - The reference to the input element.
 * @param {string} props.mode - The mode of the component.
 * @param {number} props.size - The font size of the text.
 * @param {string} props.fontFamily - The font family of the text.
 * @param {number} props.positionTop - The top position of the component.
 * @param {number} props.positionLeft - The left position of the component.
 * @param {Function} props.onChangeText - The callback function for text change event.
 * @param {Function} props.toggleEditMode - The callback function to toggle edit mode.
 * @param {Function} props.handleMouseDown - The callback function for mouse down event.
 * @param {Function} props.handleMouseMove - The callback function for mouse move event.
 * @param {Function} props.handleMouseOut - The callback function for mouse out event.
 * @param {Function} props.handleMouseUp - The callback function for mouse up event.
 * @param {number} props.lineHeight - The line height of the text.
 * @param {Function} props.removeText - The callback function to remove the text component.
 * @param {string} props.placeholderId - The ID of the placeholder.
 * @param {Function} props.setPlaceholderId - The callback function to set the placeholder ID.
 * @param {string} props.assigneeName - The name of the assignee.
 * @param {String} selectedElement - Currently selected placeholder id
 * @returns {JSX.Element} The rendered Text component.
 */
import React, { useState } from 'react';
import DraggableActions from './draggable-actions';
import { useOptionStore } from '@/store/OptionStore';
import { AttachmentTypes } from '@/pdf-module/entities/index';
import { FontColor } from '@/app/[lng]/admin/workflows/pdf-innofyre/[workflow_id]/constants';

const Text = ({
  id,
  text,
  width,
  disabled,
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
  removeText,
  placeholderId,
  setPlaceholderId,
  assigneeName,
  details,
  updateSelectedElement,
  selectedElement,
}) => {
  // handle highlighting upon focus
  const isHighlighted = selectedElement === id;

  const {
    showOptionPanel,
    setShowOptionPanel,
    setAttachmentKey,
    fontWeight,
    setAttachmentType,
  } = useOptionStore((state) => ({
    showOptionPanel: state.showOptionPanel,
    setShowOptionPanel: state.setShowOptionPanel,
    setAttachmentKey: state.setAttachmentKey,
    fontWeight: state.fontWeight,
    setAttachmentType: state.setAttachmentType,
  }));

  const handleOnClick = () => {
    updateSelectedElement(id);
    setShowOptionPanel(true);
    setAttachmentKey(id);
    setAttachmentType(AttachmentTypes.TEXT), setPlaceholderId(id);
  };

  return (
    <div
      className='border border-gray-400 bg-none'
      onClick={handleOnClick} // set selected placeholder id
    >
      <div
        onDoubleClick={toggleEditMode}
        className={`pdf-element-drag-outer ${
          isHighlighted && 'highlight-placeholder'
        } elem-text absolute`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          fontFamily: fontFamily,
          fontSize: `${size}px`,
          lineHeight: lineHeight ? `${lineHeight}px` : 'normal',
          cursor: mode === 'COMMAND' ? 'move' : 'default',
          top: `${positionTop}px`,
          left: `${positionLeft}px`,
        }}
      >
        <input
          disabled={disabled}
          onClick={handleOnClick}
          type='text'
          ref={inputRef}
          onChange={onChangeText}
          readOnly={mode === 'COMMAND'}
          className=' appearance-none border-none   w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none '
          style={{
            width: `${width}px`,
            height: `${height}px`,
            fontFamily: fontFamily,
            fontSize: `${size}px`,
            lineHeight: lineHeight ? `${lineHeight}px` : 'normal',
            padding: 0,
            margin: 0,
            cursor: mode === 'COMMAND' ? 'move' : 'text',
            fontWeight: `${details ? details.fontWeight : 'Normal'}`,
            fontStyle: `${details ? details.fontStyle : 'Normal'}`,
            backgroundColor: `${details ? details.backgroundColor : '#FFFFFF'}`,
            border: `${details ? details.border : 'none'}`,
            color: details ? details.fontColor : FontColor.BLACK,
          }}
          value={text}
        />
        {/* Add resize handle */}

        <DraggableActions
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          handleMouseOut={handleMouseOut}
          remove={removeText}
          placeholderId={placeholderId}
          assigneeName={assigneeName}
          onClick={() => setPlaceholderId(id)}
          updateSelectedElement={updateSelectedElement}
        />
      </div>
    </div>
  );
};

export { Text };

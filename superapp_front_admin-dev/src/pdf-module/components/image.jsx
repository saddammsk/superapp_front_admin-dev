/**
 * Represents an image component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique identifier of the image.
 * @param {RefObject} props.canvasRef - The reference to the canvas element.
 * @param {number} props.positionTop - The top position of the image.
 * @param {number} props.positionLeft - The left position of the image.
 * @param {number} props.width - The width of the image.
 * @param {number} props.height - The height of the image.
 * @param {Function} props.handleMouseOut - The event handler for mouse out event.
 * @param {Function} props.handleMouseDown - The event handler for mouse down event.
 * @param {Function} props.handleMouseMove - The event handler for mouse move event.
 * @param {Function} props.handleMouseUp - The event handler for mouse up event.
 * @param {Function} props.handleImageScale - The event handler for image scale event.
 * @param {boolean} props.dimmerActive - Indicates if the dimmer is active.
 * @param {Function} props.cancelDelete - The event handler for cancel delete event.
 * @param {Function} props.deleteImage - The event handler for delete image event.
 * @param {Function} props.onClick - The event handler for click event.
 * @param {Function} props.setPlaceholderId - The function to set the placeholder id.
 * @param {string} props.assigneeName - The name of the assignee.
 * @param {Function} props.removeImage - The event handler for remove image event.
 * @param {String} selectedElement - Currently selected placeholder id
 * @returns {JSX.Element} The image component.
 */
import React, { RefObject } from 'react';
import { Div } from '@/pdf-module/ui/components/Div';
import { ConfirmContent } from './confirm-content';
import DraggableActions from './draggable-actions';

/*
 * Represents an image component.
 */

const ADJUSTERS_DIMENSIONS = 20;

const Image = ({
  id,
  canvasRef,
  positionTop,
  positionLeft,
  width,
  height,
  handleMouseOut,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleImageScale,
  dimmerActive,
  cancelDelete,
  deleteImage,
  onClick,
  setPlaceholderId,
  assigneeName,
  removeImage,
  selectedElement,
}) => {
  // handle highlighting upon focus
  const isHighlighted = selectedElement === id;
  return (
    <div
      onDoubleClick={onClick}
      onClick={() => setPlaceholderId(id)}
      className={`absolute border-dashed border-gray-500 border ${
        isHighlighted && 'highlight-placeholder'
      }`}
      style={{
        top: `${positionTop}px`,
        left: `${positionLeft}px`,
        width: `${width + 2}px`,
        height: `${height + 2}px`,
        cursor: 'move',
      }}
    >
      <Div>
        <canvas
          ref={canvasRef}
          className='w-full h-full'
          style={{
            width: '100%',
            height: '100%',
          }}
        />
        <div className='absolute inset-0 flex items-center justify-center'>
          <ConfirmContent
            title='Delete?'
            onConfirm={deleteImage}
            onDismiss={cancelDelete}
          />
        </div>
      </Div>
      <div
        data-direction='top-left'
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleImageScale}
        className='absolute top-0 left-0 cursor-nwse-resize'
        style={{
          width: `${ADJUSTERS_DIMENSIONS}px`,
          height: `${ADJUSTERS_DIMENSIONS}px`,
        }}
      />
      <DraggableActions
        handleMouseDown={handleMouseDown}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
        handleMouseOut={handleMouseOut}
        remove={removeImage}
        assigneeName={assigneeName}
        updateSelectedElement={updateSelectedElement}
      />
    </div>
  );
};

export { Image };

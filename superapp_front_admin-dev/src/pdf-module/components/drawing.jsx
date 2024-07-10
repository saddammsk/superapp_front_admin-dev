/**
 * Represents a drawing component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique identifier of the drawing.
 * @param {boolean} props.dimmerActive - Indicates whether the dimmer is active.
 * @param {function} props.cancelDelete - The function to cancel the delete action.
 * @param {function} props.deleteDrawing - The function to delete the drawing.
 * @param {number} props.positionTop - The top position of the drawing.
 * @param {number} props.positionLeft - The left position of the drawing.
 * @param {number} props.width - The width of the drawing.
 * @param {number} props.height - The height of the drawing.
 * @param {React.Ref} props.svgRef - The reference to the SVG element.
 * @param {string} props.path - The path of the drawing.
 * @param {string} props.stroke - The stroke color of the drawing.
 * @param {number} props.strokeWidth - The stroke width of the drawing.
 * @param {function} props.handleMouseDown - The function to handle mouse down event.
 * @param {function} props.handleMouseMove - The function to handle mouse move event.
 * @param {function} props.handleMouseOut - The function to handle mouse out event.
 * @param {function} props.handleMouseUp - The function to handle mouse up event.
 * @param {function} props.onClick - The function to handle click event.
 * @param {function} props.setPlaceholderId - The function to set the placeholder ID.
 * @param {String} selectedElement - Currently selected placeholder id
 * @returns {JSX.Element} The drawing component.
 */

import React from 'react';
import { Transition } from '@headlessui/react';
import { Div } from '@/pdf-module/ui/components/Div';
import { ConfirmContent } from './confirm-content';

const Drawing = ({
  id,
  dimmerActive,
  cancelDelete,
  deleteDrawing,
  positionTop,
  positionLeft,
  width,
  height,
  svgRef,
  path,
  stroke,
  strokeWidth,
  handleMouseDown,
  handleMouseMove,
  handleMouseOut,
  handleMouseUp,
  onClick,
  setPlaceholderId,
  selectedElement,
}) => {
  // handle highlighting upon focus
  const isHighlighted = selectedElement === id;
  return (
    <div
      onClick={() => setPlaceholderId(id)}
      onDoubleClick={onClick}
      className={`absolute ${isHighlighted && 'highlight-placeholder'}`}
      style={{
        top: `${positionTop}px`,
        left: `${positionLeft}px`,
        width: `${width}px`,
        height: `${height}px`,
        cursor: 'move',
      }}
    >
      <Div>
        <svg ref={svgRef}>
          <path
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            strokeLinejoin='round'
            stroke={stroke}
            fill='none'
            d={path}
          />
        </svg>
        <Transition
          show={dimmerActive}
          enter='transition-opacity duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          {(ref) => (
            <div ref={ref}>
              <ConfirmContent
                title='Delete?'
                onConfirm={deleteDrawing}
                onDismiss={cancelDelete}
              />
            </div>
          )}
        </Transition>
      </Div>
    </div>
  );
};

export { Drawing };

/**
 * DraggableActions component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.handleMouseDown - The function to handle mouse down event.
 * @param {Function} props.handleMouseMove - The function to handle mouse move event.
 * @param {Function} props.handleMouseUp - The function to handle mouse up event.
 * @param {Function} props.handleMouseOut - The function to handle mouse out event.
 * @param {Function} props.remove - The function to remove an item.
 * @param {string} props.placeholderId - The ID of the placeholder.
 * @param {string} props.assigneeName - The name of the assignee.
 * @returns {JSX.Element} The rendered DraggableActions component.
 */

import React from 'react';

const DraggableActions = ({
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleMouseOut,
  remove,
  placeholderId,
  assigneeName,
}) => {
  const handleRemoveItem = () => {
    remove();
  };

  return (
    <>
      <span className='draggable-actions'>
        <div
          className='move-icon'
          draggable='false'
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseOut={handleMouseOut}
        >
          <i className='fa fa-arrows' aria-hidden='true'></i>
        </div>
        <div className='close-icon' draggable='false' onClick={handleRemoveItem}>
          <i className='fa fa-trash-can' aria-hidden='true'></i>
        </div>
      </span>
      <div
        className='asignee-icon'
        style={{ color: '#14a39c' }}
        draggable='true'
      >
        <i
          className={
            assigneeName != 'Asignee Name' ? 'fa fa-user' : 'fa fa-user-plus'
          }
          aria-hidden='true'
        ></i>
        <span className='pl-2 underline'>{assigneeName}</span>
      </div>
    </>
  );
};

export default DraggableActions;

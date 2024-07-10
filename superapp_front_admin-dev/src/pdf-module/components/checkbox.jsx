/**
 * Checkbox component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique identifier of the checkbox.
 * @param {boolean} props.checked - The checked state of the checkbox.
 * @param {number} props.width - The width of the checkbox.
 * @param {number} props.height - The height of the checkbox.
 * @param {React.Ref} props.inputRef - The ref for the checkbox input element.
 * @param {string} props.mode - The mode of the checkbox.
 * @param {number} props.size - The font size of the checkbox.
 * @param {string} props.fontFamily - The font family of the checkbox.
 * @param {number} props.positionTop - The top position of the checkbox.
 * @param {number} props.positionLeft - The left position of the checkbox.
 * @param {function} props.onCheckedChange - The callback function for when the checkbox is checked/unchecked.
 * @param {function} props.toggleEditMode - The callback function for toggling the edit mode of the checkbox.
 * @param {function} props.handleMouseDown - The callback function for mouse down event on the checkbox.
 * @param {function} props.handleMouseMove - The callback function for mouse move event on the checkbox.
 * @param {function} props.handleMouseOut - The callback function for mouse out event on the checkbox.
 * @param {function} props.handleMouseUp - The callback function for mouse up event on the checkbox.
 * @param {number} props.lineHeight - The line height of the checkbox.
 * @param {function} props.removeCheckBox - The callback function for removing the checkbox.
 * @param {string} props.assigneeName - The name of the assignee.
 * @param {function} props.setPlaceholderId - The callback function for setting the placeholder id.
 * @param {boolean} props.disabled - The disabled state of the checkbox.
 * @param {String} updateSelectedElement - Update currently selected placeholder id
 * @param {String} selectedElement - Currently selected placeholder id
 * @returns {JSX.Element} The rendered Checkbox component.
 */
import React from 'react';
import DraggableActions from '@/pdf-module/components/draggable-actions';
import { AttachmentTypes } from '../entities';
import { useOptionStore } from '@/store/OptionStore';

const CheckBox = ({
  id,
  checked,
  width,
  height,
  inputRef,
  mode,
  size,
  fontFamily,
  positionTop,
  positionLeft,
  onCheckedChange,
  toggleEditMode,
  handleMouseDown,
  handleMouseMove,
  handleMouseOut,
  handleMouseUp,
  lineHeight,
  removeCheckBox,
  assigneeName,
  setPlaceholderId,
  disabled,
  updateSelectedElement,
  selectedElement,
}) => {
  const { setShowOptionPanel, setAttachmentKey, setAttachmentType } =
    useOptionStore((state) => ({
      showOptionPanel: state.showOptionPanel,
      setShowOptionPanel: state.setShowOptionPanel,
      setAttachmentKey: state.setAttachmentKey,
      fontWeight: state.fontWeight,
      setAttachmentType: state.setAttachmentType,
    }));

  // handle highlighting upon focus
  const isHighlighted = selectedElement === id;

  const handleOnClick = () => {
    updateSelectedElement(id);
    setShowOptionPanel(false);
    setAttachmentKey(id);
    setAttachmentType(AttachmentTypes.CHECKBOX), setPlaceholderId(id);
  };

  return (
    <div
      onDoubleClick={toggleEditMode}
      onClick={handleOnClick}
      className={`pdf-element-drag-outer ${
        isHighlighted && 'highlight-placeholder'
      } elem-check absolute`}
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
        type='checkbox'
        ref={inputRef}
        onChange={onCheckedChange}
        readOnly={mode === 'COMMAND'}
        className=' border-none'
        style={{
          fontFamily: fontFamily,
          fontSize: `${size}px`,
          lineHeight: lineHeight ? `${lineHeight}px` : 'normal',
          padding: 0,
          margin: 0,
          cursor: mode === 'COMMAND' ? 'move' : 'text',
        }}
        checked={checked}
        disabled={disabled}
      />
      <DraggableActions
        handleMouseDown={handleMouseDown}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
        handleMouseOut={handleMouseOut}
        remove={removeCheckBox}
        assigneeName={assigneeName}
        updateSelectedElement={updateSelectedElement}
      />
    </div>
  );
};

export { CheckBox };

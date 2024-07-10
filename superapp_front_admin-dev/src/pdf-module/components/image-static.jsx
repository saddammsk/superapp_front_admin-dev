/**
 * Renders a static image element with draggable actions.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique identifier of the image element.
 * @param {string} props.usage - The usage type of the image element.
 * @param {number} props.width - The width of the image element.
 * @param {number} props.height - The height of the image element.
 * @param {number} props.size - The height of the image element.
 * @param {number} props.positionTop - The top position of the image element.
 * @param {number} props.positionLeft - The left position of the image element.
 * @param {Function} props.toggleEditMode - The function to toggle the edit mode of the image element.
 * @param {Function} props.handleMouseDown - The function to handle mouse down event on the image element.
 * @param {Function} props.handleMouseMove - The function to handle mouse move event on the image element.
 * @param {Function} props.handleMouseOut - The function to handle mouse out event on the image element.
 * @param {Function} props.handleMouseUp - The function to handle mouse up event on the image element.
 * @param {Function} props.removeElement - The function to remove the image element.
 * @param {string} props.assigneeName - The name of the assignee for the image element.
 * @param {Function} props.handleImageClick - The function to handle click event on the image element.
 * @param {Function} props.addSignature - The function to add a signature to the image element.
 * @param {Function} props.setPlaceholderId - The function to set the placeholder ID of the image element.
 * @param {Function} props.updateSelectedElement - The function to set the placeholder ID of the image element.
 * @param {String} selectedElement - Currently selected placeholder id
 * @returns {JSX.Element} The rendered static image element.
 */
import React from 'react';
import UserSelection from '@/pdf-module/components/user-selection';
import DraggableActions from '@/pdf-module/components/draggable-actions';
import { ImagePlaceHolderUsage } from '@/pdf-module/entities';
import { useOptionStore } from '@/store/OptionStore';
import { AttachmentTypes } from '@/pdf-module/entities/index';

const ImageStatic = ({
  id,
  usage,
  width,
  height,
  positionTop,
  positionLeft,
  toggleEditMode,
  handleMouseDown,
  handleMouseMove,
  handleMouseOut,
  handleMouseUp,
  removeElement,
  assigneeName,
  handleImageClick,
  addSignature,
  setPlaceholderId,
  details,
  updateSelectedElement,
  selectedElement,
  updateImageStaticAttachment,
  showMetadata
}) => {
  const { setShowOptionPanel, setAttachmentType } = useOptionStore((state) => ({
    showOptionPanel: state.showOptionPanel,
    setShowOptionPanel: state.setShowOptionPanel,
    setAttachmentKey: state.setAttachmentKey,
    fontWeight: state.fontWeight,
    setAttachmentType: state.setAttachmentType,
  }));

  // handle highlighting upon focus
  const isHighlighted = selectedElement === id;

  return (
    <div
      className='bg-none'
      onClick={() => {
        
          setShowOptionPanel(true);
        setAttachmentType(AttachmentTypes.IMAGE_STATIC);
        setPlaceholderId(id),
          updateSelectedElement(id)
      }}
    >
      <div
        onDoubleClick={toggleEditMode}
        className={`pdf-element-drag-outer ${
          isHighlighted && 'highlight-placeholder'
        } elem-text absolute`}
        style={{
          width: `${width}px`,
          height: `${height+10}px`,
          top: `${positionTop}px`,
          left: `${positionLeft}px`,
        }}
      >
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: `${details ? details.backgroundColor : '#FFFFFF'}`,
            border: `${details ? details.border : 'none'}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <label htmlFor='image-upload' style={{ cursor: 'pointer' }}>
            <i
              className={
                usage == ImagePlaceHolderUsage.IMAGE
                  ? 'fas fa-cloud-upload-alt fa-3x'
                  : 'fa-solid fa-signature fa-3x'
              }
              style={{ color: '#007bff' }}
            ></i>{' '}
            <br />
            {usage === ImagePlaceHolderUsage.IMAGE && (
              <p
                className='text-xs'
                // onClick={handleImageClick}
              >
                Upload image
              </p>
            )}
            {usage === ImagePlaceHolderUsage.SIGNATURE && (
              <><p
                className='text-xs'
                // onClick={addSignature}
              >
                Firma aqui
              </p>
              <p
              className='text-xs'
              // onClick={addSignature}
            >
              <label>
  <input type="checkbox" className='mr-2' checked={showMetadata} onChange={(e)=>{
    updateImageStaticAttachment({
      showMetadata: e.target.checked
    })
  }} />
  Mostrar metadatos
</label>
            </p></>
            )}
          </label>
        </div>
        <DraggableActions
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          handleMouseOut={handleMouseOut}
          remove={removeElement}
          assigneeName={assigneeName}
          updateSelectedElement={updateSelectedElement}
        />
      </div>
    </div>
  );
};

export { ImageStatic };

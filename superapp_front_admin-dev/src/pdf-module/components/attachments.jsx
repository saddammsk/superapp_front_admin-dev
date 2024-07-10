/**
 * Renders a list of attachments based on the provided data.
 *
 * @component
 * @param {Object[]} attachments - The list of attachments to render.
 * @param {string} pdfName - The name of the PDF.
 * @param {Object} pageDimensions - The dimensions of the page.
 * @param {Function} removeAttachment - The function to remove an attachment.
 * @param {Function} updateAttachment - The function to update an attachment.
 * @param {string} placeholderId - The ID of the placeholder.
 * @param {Function} setPlaceholderId - The function to set the placeholder ID.
 * @param {Function} handleImageClick - The function to handle image click.
 * @param {Function} addSignature - The function to add a signature.
 * @param {String} selectedElement - Currently selected placeholder id
 * @returns {JSX.Element|null} The rendered attachments or null if no attachments are provided.
 */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { AttachmentTypes } from '@/pdf-module/entities';
import { Image } from '@/pdf-module/containers/image';
import { Drawing } from '@/pdf-module/containers/drawing';
import { Text } from '@/pdf-module/containers/text';
import { TextView } from '@/pdf-module/containers/text-view';
import { CheckBox } from '@/pdf-module/containers/checkbox';
import { ImageStatic } from '@/pdf-module/containers/image-static';

const Attachments = ({
  attachments,
  pdfName,
  pageDimensions,
  removeAttachment,
  updateAttachment,
  placeholderId,
  setPlaceholderId,
  handleImageClick,
  addSignature,
  updateAttachmentStyles,
  updateSelectedElement,
  selectedElement,
}) => {
  const handleAttachmentUpdate = (index) => (attachment) =>
    updateAttachment(index, attachment);

  return attachments ? (
    <>
      {attachments.length
        ? attachments.map((attachment, index) => {
            const key = `${pdfName}-${index}-${uuidv4()}`;

            {
              /*
               *The following code renders the attachments based on their type.
               *The attachment type is used to determine which component to render.
               *The key is used to ensure that the component is unique.
               *The props are passed to the component to render the attachment.
               *The removeAttachment function is passed to the component to allow the user to remove the attachment.
               *The updateAttachment function is passed to the component to allow the user to update the attachment.
               *The placeholderId and setPlaceholderId are passed to the component to allow the user to set the placeholder ID.
               *The handleImageClick function is passed to the component to allow the user to handle image click.
               *The addSignature function is passed to the component to allow the user to add a signature.
               *The pageDimensions are passed to the component to allow the component to calculate the position of the attachment.
               *The pageWidth and pageHeight are passed to the component to allow the component to calculate the position of the attachment.
               */
            }
            if (attachment.type === AttachmentTypes.IMAGE_STATIC) {
              console.log("ATTACHMENT!!!!", attachment)
              return (
                <ImageStatic
                  key={key}
                  pageWidth={pageDimensions.width}
                  pageHeight={pageDimensions.height}
                  updateImageStaticAttachment={handleAttachmentUpdate(index)}
                  removeElement={() => removeAttachment(index)}
                  placeholderId={placeholderId}
                  handleImageClick={handleImageClick}
                  addSignature={addSignature}
                  setPlaceholderId={setPlaceholderId}
                  updateSelectedElement={updateSelectedElement}
                  selectedElement={selectedElement}
                  {...attachment}
                />
              );
            }

            if (attachment.type === AttachmentTypes.IMAGE) {
              return (
                // eslint-disable-next-line jsx-a11y/alt-text
                <Image
                  key={key}
                  pageWidth={pageDimensions.width}
                  pageHeight={pageDimensions.height}
                  removeImage={() => removeAttachment(index)}
                  updateImageAttachment={handleAttachmentUpdate(index)}
                  setPlaceholderId={setPlaceholderId}
                  selectedElement={selectedElement}
                  {...attachment}
                />
              );
            }

            if (attachment.type === AttachmentTypes.SIGNATURE) {
              return (
                <Drawing
                  key={key}
                  pageWidth={pageDimensions.width}
                  pageHeight={pageDimensions.height}
                  removeDrawing={() => removeAttachment(index)}
                  updateDrawingAttachment={handleAttachmentUpdate(index)}
                  addSignature={addSignature}
                  setPlaceholderId={setPlaceholderId}
                  selectedElement={selectedElement}
                  {...attachment}
                />
              );
            }

            if (attachment.type === AttachmentTypes.TEXT) {
              return (
                <Text
                  key={key}
                  pageWidth={pageDimensions.width}
                  pageHeight={pageDimensions.height}
                  updateTextAttachment={handleAttachmentUpdate(index)}
                  removeText={() => removeAttachment(index)}
                  placeholderId={placeholderId}
                  setPlaceholderId={setPlaceholderId}
                  updateSelectedElement={updateSelectedElement}
                  selectedElement={selectedElement}
                  {...attachment}
                />
              );
            }

            if (attachment.type === AttachmentTypes.TEXT_VIEW) {
              return (
                <TextView
                  key={key}
                  pageWidth={pageDimensions.width}
                  pageHeight={pageDimensions.height}
                  updateTextViewAttachment={handleAttachmentUpdate(index)}
                  removeTextView={() => removeAttachment(index)}
                  placeholderId={placeholderId}
                  setPlaceholderId={setPlaceholderId}
                  selectedElement={selectedElement}
                  {...attachment}
                />
              );
            }

            if (attachment.type === AttachmentTypes.CHECKBOX) {
              return (
                <CheckBox
                  key={key}
                  pageWidth={pageDimensions.width}
                  pageHeight={pageDimensions.height}
                  updateCheckBoxAttachment={handleAttachmentUpdate(index)}
                  removeCheckBox={() => removeAttachment(index)}
                  setPlaceholderId={setPlaceholderId}
                  updateSelectedElement={updateSelectedElement}
                  selectedElement={selectedElement}
                  {...attachment}
                />
              );
            }
            return null;
          })
        : null}
    </>
  ) : null;
};

export { Attachments };

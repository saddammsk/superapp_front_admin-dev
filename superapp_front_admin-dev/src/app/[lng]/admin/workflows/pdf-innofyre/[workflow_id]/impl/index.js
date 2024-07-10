import { v4 as uuidv4 } from 'uuid';

import { mapAttachmentTypeByUsage } from '../helpers';
import { toast } from 'react-toastify';
import { Text, AttachmentTypes } from '@/pdf-module/entities/index';
/**
 * Formats an attachment object for creating instructions.
 * Remove unnecessary properties, set attachment type based on usage property,
 * add unique key, order, page, dimensions and position
 * @param {Object} attachment - The attachment object to format.
 * @param {number} idx - The index of the attachment in the current page.
 * @param {number} pageIndex - The index of the current page.
 * @returns {Object} - The formatted attachment object.
 * @throws {Error} - Throws an error if assignees are missing for the instruction(s).
 */
export const formatAttachmentForInstructionCreation = (
  attachment,
  idx,
  pageIndex
) => {
  if (!attachment.userId) {
    throw new Error('ASSIGNEE_MISSING');
  }

  // based on the usage add type
  let currentAttachmentType = mapAttachmentTypeByUsage(attachment);

  let auto_incremental_key =
    attachment.instructionKey ?? currentAttachmentType + '_' + uuidv4();
  let details = {};

  if (currentAttachmentType === AttachmentTypes.TEXT) {
    details = {
      backgroundColor: attachment?.details?.backgroundColor,
      fontStyle: attachment?.details?.fontStyle,
      fontWeight: attachment?.details?.fontWeight
        ? attachment?.details?.fontWeight
        : null,
      border: attachment?.details?.border,
      size: attachment?.size ?? Text.SIZE_DEFAULT,
      fontColor: attachment?.details?.fontColor ?? '#000000',
    };
  } else if (
    currentAttachmentType === AttachmentTypes.SIGNATURE ||
    currentAttachmentType === AttachmentTypes.IMAGE
  ) {
    details = {
      backgroundColor: attachment?.details?.backgroundColor
        ? attachment?.details?.backgroundColor
        : null,
      border: attachment?.details?.border ? attachment?.details?.border : null,
    };
  }

  return {
    type: currentAttachmentType,
    key: auto_incremental_key,
    label: String(attachment.value || ''),
    user_id: attachment.userId,
    order: idx + 1,
    page: pageIndex + 1,
    // ! TODO spelling error
    dimesions: {
      width: attachment.width,
      height: attachment.height,
    },
    required: attachment.required == 1 ? true : false,
    positions: {
      x: attachment.x,
      y: attachment.y,
    },
    dynamic: attachment.dynamic,
    details: {...details, showMetadata: attachment.showMetadata},
  };
};

/**
 * Builds the payload object to create document instructions.
 * @param {Object} currentBlockInfo - Information about the current block.
 * @param {Array} allPageAttachments - Array of attachments for each page.
 * @returns {Object} - Payload object to create document instructions.
 */
export const buildPayloadToCreateDocumentInstructions = (
  currentBlockInfo,
  allPageAttachments
) => {
  // Initialize payload object with default values
  const transformedAttachmentsObj = {
    id: currentBlockInfo?.id,
    workflow_id: currentBlockInfo?.workflowId,
    template_id: currentBlockInfo?.template_id,
    template_aws_path: currentBlockInfo?.filePath,
    block_key: currentBlockInfo?.block_key,
    file_type: currentBlockInfo?.fileType,
    type: currentBlockInfo?.type,
    instructions: [],
  };

  // Create nested object with attachment details, removing undefined pages
  const allPageAttachmentsWithPureData = allPageAttachments.map((item) =>
    item === undefined ? [] : item
  );

  try {
    // Transform attachments into instructions
    const transformedInstructions = allPageAttachmentsWithPureData.map(
      (page, pageIndex) =>
        page.map((attachment, idx) => {
          // Format attachment for instruction creation
          const transformedAttachment = formatAttachmentForInstructionCreation(
            attachment,
            idx,
            pageIndex
          );
          return transformedAttachment;
        })
    );

    // Flatten the nested array of instructions
    transformedAttachmentsObj.instructions = transformedInstructions
      .reverse()
      .flat();

    // Check if any instructions are present
    if (transformedAttachmentsObj.instructions.length === 0) {
      toast.error('Please add instructions before submit');
      return null;
    }
  } catch (error) {
    // Handle errors
    if (error.message === 'ASSIGNEE_MISSING') {
      toast.error('Assignees are missing for the instruction(s)');
    } else {
      console.error(error);
      toast.error('Something went wrong');
    }
    return null;
  }

  // Return the payload object
  return transformedAttachmentsObj;
};

import { v4 as uuidv4 } from 'uuid';

import { AttachmentTypes, ImagePlaceHolderUsage } from '@/pdf-module/entities';

/**
 * Maps the attachment type based on its usage.
 * @param {string} attachment - Attachment object.
 * @returns {string} - The mapped attachment type.
 */
export const mapAttachmentTypeByUsage = (attachment) => {
  const { usage, type } = attachment;
  let currentAttachmentType = type;

  if (usage === ImagePlaceHolderUsage.IMAGE) {
    currentAttachmentType = AttachmentTypes.IMAGE;
  } else if (usage === ImagePlaceHolderUsage.SIGNATURE) {
    currentAttachmentType = AttachmentTypes.SIGNATURE;
  }

  return currentAttachmentType;
};

/**
 * Maps the usage based on the attachment type.
 * @param {string} attachmentType - The type of the attachment.
 * @returns {string} - The mapped usage.
 */
export const mapUsageByAttachmentType = (attachmentType) => {
  let usage = attachmentType;

  if (attachmentType === AttachmentTypes.IMAGE) {
    usage = ImagePlaceHolderUsage.IMAGE;
  } else if (attachmentType === AttachmentTypes.SIGNATURE) {
    usage = ImagePlaceHolderUsage.SIGNATURE;
  }
  return usage;
};

/**
 * Maps the instruction type to a static image type if necessary.
 * @param {string} type - The type of the instruction.
 * @returns {string} - The mapped type.
 */
export const mapInstructionTypeToStaticImage = (type) => {
  return type === AttachmentTypes.IMAGE || type === AttachmentTypes.SIGNATURE
    ? AttachmentTypes.IMAGE_STATIC
    : type;
};

/**
 * Formats a string by removing underscores and capitalizing the first letter of each word.
 * @param {string} inputString  - The string to be formatted.
 * @returns The formatted string.
 * Example usage:
 * ```
 * const input = "dark_blue";
 * const formattedOutput = formatString(input);
 * console.log(`Input: ${input}`);
 * console.log(`Formatted Output: ${formattedOutput}`);
 * Output:
 * Input: dark_blue
 * Formatted Output: Dark Blue
 * ```
 */
export const formatString = (inputString) => {
  // Split the input string by underscores to get an array of words
  const words = inputString.split('_');

  // Capitalize the first letter of each word and convert the rest of the letters to lowercase
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  // Join the words back together with spaces
  return capitalizedWords.join(' ');
};

/**
 * Generate key for attachments
 * @param {string} currentAttachmentType - type of the attachment(text, image, checkbox, etc.)
 */
export const generateUniqueKey = (currentAttachmentType) => {
  return currentAttachmentType + '_' + uuidv4();
};

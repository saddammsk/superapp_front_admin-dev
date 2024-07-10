
/**
 * Custom hook for handling file uploads.
 *
 * @param {Object} options - The options for the uploader.
 * @param {string} options.use - The type of upload to handle. Can be 'pdf' or 'image'.
 * @param {Function} options.afterUploadPdf - The callback function to execute after uploading a PDF.
 * @param {Function} options.afterUploadAttachment - The callback function to execute after uploading an image.
 * @returns {Object} - The uploader object with upload-related functions and state.
 */

import React, { useState, createRef } from 'react';
import {
  readAsPDF,
  readAsDataURL,
  readAsImage,
} from '@/pdf-module/utils/asyncReader';
import { ggID } from '@/pdf-module/utils/helpers';
import { uniqueId } from 'lodash';
import { Pdf } from '@/pdf-module/hooks/use-pdf';
import { AttachmentTypes } from '@/pdf-module/entities';

export const UploadTypes = {
  PDF: 'pdf',
  IMAGE: 'image',
};

const handlers = {
  pdf: async (file) => {
    try {
      const pdf = await readAsPDF(file);
      return {
        file,
        name: file.name,
        pages: Array(pdf.numPages)
          .fill(0)
          .map((_, index) => pdf.getPage(index + 1)),
      };
    } catch (error) {
      console.log('Failed to load pdf', error);
      throw new Error('Failed to load PDF');
    }
  },
  image: async (file) => {
    try {
      const url = await readAsDataURL(file);
      const img = await readAsImage(url);
      // const id = ggID();
      const id = uniqueId();
      const { width, height } = img;

      const imageAttachemnt = {
        id,
        type: AttachmentTypes.IMAGE,
        width,
        height,
        x: 0,
        y: 0,
        img,
        file,
        assigneeName: 'Assignee',
      };
      return imageAttachemnt;
    } catch (error) {
      console.log('Failed to load image', error);
      throw new Error('Failed to load image');
    }
  },
  url_pdf: async (url) => {
    try {
      // Fetch the PDF from the URL
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch PDF');
      }
      const blob = await response.blob();

      // Read the PDF
      const pdf = await readAsPDF(blob);

      // Construct the result object
      const result = {
        file: blob,
        name: 'Consulting agreement.pdf', // You may want to extract the name from the URL or response headers
        pages: Array(pdf.numPages)
          .fill(0)
          .map((_, index) => pdf.getPage(index + 1)),
      };

      return result;
    } catch (error) {
      console.log('Failed to load PDF from URL', error);
      throw new Error('Failed to load PDF from URL');
    }
  },
};

export const useUploader = ({ use, afterUploadPdf, afterUploadAttachment }) => {
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = createRef();

  const onClick = (event) => {
    event.currentTarget.value = '';
  };

  const handleClick = () => {
    const input = inputRef.current;
    if (input) {
      setIsUploading(true);
      input.click();
    }
  };

  const upload = async (event) => {
    if (!isUploading) {
      return;
    }

    const files =
      event.currentTarget.files ||
      (event.dataTransfer && event.dataTransfer.files);
    if (!files) {
      setIsUploading(false);
      return;
    }

    const file = files[0];

    const result = await handlers[use](file);

    if (use === 'pdf' && afterUploadPdf) {
      afterUploadPdf(result);
    }

    if (use === 'image' && afterUploadAttachment) {
      afterUploadAttachment(result);
    }
    setIsUploading(false);
    return;
  };

  return {
    upload,
    onClick,
    inputRef,
    isUploading,
    handleClick,
  };
};

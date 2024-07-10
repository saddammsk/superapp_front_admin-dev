
/**
 * Custom hook for loading and handling static PDF files.
 *
 * @param {Object} options - The options for the hook.
 * @param {string} options.use - The type of file to load. Currently only supports 'url_pdf'.
 * @param {Function} options.pdfView - Optional callback function to handle the loaded PDF.
 * @param {string} options.filePath - The file path or URL of the PDF file.
 * @returns {Object} - An object containing the staticPdf function and inputRef.
 */

import React, { createRef } from 'react';
import axios from 'axios';
import { readAsStaticPDF } from '@/pdf-module/utils/asyncReader';

export const fileTypes = {
  PDF: 'url_pdf',
};

const handlers = {
  url_pdf: async (url) => {
    try {
      let pdf;
      const response = await axios.get(url);
      if (response?.data?.success) {
        const pdfData = response?.data?.data;
        pdf = pdfData;
      }

      const readPdf = await readAsStaticPDF(pdf);

      // Construct the result object
      const result = {
        file: readPdf,
        name: 'Consulting agreement.pdf',
        pages: Array(readPdf.numPages)
          .fill(0)
          .map((_, index) => readPdf.getPage(index + 1)),
      };

      return result;
    } catch (error) {
      console.log('Failed to load PDF from URL', error);
      throw new Error('Failed to load PDF from URL');
    }
  },
};

export const usePdfStatic = ({ use, pdfView, filePath }) => {
  const inputRef = createRef();

  const staticPdf = async (event) => {
    const file = `https://super.xertify.co:40007/files-manager/downloadFile?key=${filePath}`;

    const result = await handlers[use](file);

    if (use === 'url_pdf' && pdfView) {
      pdfView(result);
    }
    return;
  };

  return {
    staticPdf,
    inputRef,
  };
};

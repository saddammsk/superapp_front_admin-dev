import { getAsset } from "./prepareAssets";

/**
 * Reads a file as an array buffer.
 * @param {File} file - The file to read.
 * @returns {Promise<ArrayBuffer>} A promise that resolves with the array buffer of the file.
 */
export const readAsArrayBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Reads an image from a source.
 * @param {string|Blob} src - The source of the image.
 * @returns {Promise<HTMLImageElement>} A promise that resolves with the loaded image.
 */
export const readAsImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    if (src instanceof Blob) {
      const url = window.URL.createObjectURL(src);
      img.src = url;
    } else {
      img.src = src;
    }
  });
};

/**
 * Reads a file as a data URL.
 * @param {File} file - The file to read.
 * @returns {Promise<string>} A promise that resolves with the data URL of the file.
 */
export const readAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Reads a file as a PDF using pdf.js library.
 * @param {File} file - The file to read.
 * @returns {Promise<PDFDocumentProxy>} A promise that resolves with the PDF document.
 */
export const readAsPDF = async (file) => {
  const pdfjsLib = await getAsset("pdfjsLib");
  const blob = new Blob([file]);
  const url = window.URL.createObjectURL(blob);
  return pdfjsLib.getDocument(url).promise;
};

/**
 * Reads a static PDF data as a PDF using pdf.js library.
 * @param {string} file - The static PDF data.
 * @returns {Promise<PDFDocumentProxy>} A promise that resolves with the PDF document.
 */
export const readAsStaticPDF = async (file) => {
  const pdfjsLib = await getAsset("pdfjsLib");

  const pdfData = atob(file);
  const pdfDataLength = pdfData.length;
  const dataArray = new Uint8Array(new ArrayBuffer(pdfDataLength));
  for (var i = 0; i < pdfDataLength; i++) {
    dataArray[i] = pdfData.charCodeAt(i);
  }
  return pdfjsLib.getDocument(dataArray).promise;
};

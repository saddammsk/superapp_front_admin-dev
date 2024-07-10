import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Cookies from 'js-cookie';
import { readAsStaticPDF } from '@/pdf-module/utils/asyncReader';
import axios from 'axios';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getDecodedToken() {
  return Cookies.get('decodedToken') ? JSON.parse(Cookies.get('decodedToken')) : null;
}

export async function getFirstPageOfPdfInImage(pdfBase64) {
  try {
    let pdf = pdfBase64.split(',')[1];

    const readPdf = await readAsStaticPDF(pdf);

    // Construct the result object
    const result = {
      file: readPdf,
      name: 'Consulting agreement.pdf',
      pages: Array(readPdf.numPages)
        .fill(0)
        .map((_, index) => readPdf.getPage(index + 1)),
    };

    const pdfPage = result.file;
    const page = await pdfPage.getPage(1);
    const viewport = page.getViewport({ scale: 1 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({ canvasContext: context, viewport }).promise;
    const thumbnailUrl = canvas.toDataURL('image/png');

    return thumbnailUrl;
  } catch (error) {
    console.log('Failed to load PDF from URL', error);
    throw new Error('Failed to load PDF from URL');
  }
}

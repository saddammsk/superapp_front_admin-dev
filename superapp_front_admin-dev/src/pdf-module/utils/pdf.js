import { readAsArrayBuffer, readAsStaticPDF } from './asyncReader';
import { getAsset } from './prepareAssets';
import { normalize } from './helpers';

/**
 * Saves objects as PDF using PDFLib library.
 *
 * @param {File} pdfFile - The PDF file to be modified.
 * @param {Array} objects - An array of objects representing the elements to be added to each page of the PDF.
 * @param {string} name - The name of the output PDF file.
 * @returns {Promise<void>} - A Promise that resolves when the PDF is saved.
 * @throws {Error} - If there is an error loading or saving the PDF.
 */
export async function save(pdfFile, objects, name) {
  const PDFLib = await getAsset('PDFLib');
  const download = await getAsset('download');
  let pdfDoc;

  try {
    // pdfDoc = await PDFLib.PDFDocument.load(await readAsStaticPDF(pdfFile));
    pdfDoc = await readAsStaticPDF(pdfFile);
  } catch (e) {
    console.log('Failed to load PDF.');
    throw e;
  }

  const pagesProcesses = pdfDoc.getPages().map(async (page, pageIndex) => {
    const pageObjects = objects[pageIndex];
    const pageHeight = page.getHeight();
    const embedProcesses = pageObjects.map(async (object) => {
      if (object.type === 'image') {
        const { file, x, y, width, height } = object;
        let img;
        try {
          if (file.type === 'image/jpeg') {
            img = await pdfDoc.embedJpg(await readAsArrayBuffer(file));
          } else {
            img = await pdfDoc.embedPng(await readAsArrayBuffer(file));
          }
          return () =>
            page.drawImage(img, {
              x,
              y: pageHeight - y - height,
              width,
              height,
            });
        } catch (e) {
          console.log('Failed to embed image.', e);
          throw e;
        }
      } else if (object.type === 'text') {
        const { x, y, text, lineHeight, size, fontFamily, width } = object;
        const pdfFont = await pdfDoc.embedFont(fontFamily);
        return () =>
          page.drawText(text, {
            maxWidth: width,
            font: pdfFont,
            size,
            lineHeight,
            x,
            y: pageHeight - size - y,
          });
      } else if (object.type === 'checkbox') {
        const { x, y, checked, lineHeight, size, fontFamily, width } = object;
        const { rgb, degrees } = PDFLib;
        const pdfFont = await pdfDoc.embedFont(fontFamily);
        const color = window.w3color('black').toRgb();
        return () => {
          page.drawRectangle({
            x: x - 10, // Adjust x position to center the square around the check mark
            y: pageHeight - size - y - 10, // Adjust y position to center the square around the check mark
            width: size + 5, // Width of the square
            height: size + 5, // Height of the square
            color: rgb(0, 0, 0), // Black color
            borderColor: rgb(0, 0, 0), // Black border color
            borderWidth: 1, // Border width
          });

          if (checked) {
            // Draw a checkmark at a specific position
          } else {
            page.drawRectangle({
              x,
              y: pageHeight - size - y,
              width: 5,
              height: 2,
              color: rgb(1, 1, 1), // Black color
              borderColor: rgb(1, 1, 1),
              borderWidth: 0,
              rotate: degrees(135),
            });
            page.drawRectangle({
              x,
              y: pageHeight - size - y,
              width: 10,
              height: 2,
              color: rgb(1, 1, 1), // Black color
              borderColor: rgb(1, 1, 1),
              borderWidth: 0,
              rotate: degrees(45),
            });
          }
        };
      } else if (object.type === 'drawing') {
        const { x, y, path, scale, stroke, strokeWidth } = object;
        const {
          pushGraphicsState,
          setLineCap,
          popGraphicsState,
          setLineJoin,
          LineCapStyle,
          LineJoinStyle,
          rgb,
        } = PDFLib;
        return () => {
          page.pushOperators(
            pushGraphicsState(),
            setLineCap(LineCapStyle.Round),
            setLineJoin(LineJoinStyle.Round)
          );

          const color = window.w3color(stroke).toRgb();
          /* Draw the path */
          page.drawSvgPath(path, {
            borderColor: rgb(
              normalize(color.r),
              normalize(color.g),
              normalize(color.b)
            ),
            borderWidth: strokeWidth,
            scale,
            x,
            y: pageHeight - y,
          });
          page.pushOperators(popGraphicsState());
        };
      }
    });
    const drawProcesses = await Promise.all(embedProcesses);
    drawProcesses.forEach((p) => p());
  });
  await Promise.all(pagesProcesses);
  try {
    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, name, 'application/pdf');
  } catch (e) {
    console.log('Failed to save PDF.');
    throw e;
  }
}

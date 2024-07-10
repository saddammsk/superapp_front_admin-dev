
/**
 * @fileoverview This file contains utility functions related to preparing assets for PDF generation.
 * @module prepareAssets
 */

/**
 * An array of scripts to be loaded as assets.
 * @type {Array<{ name: string, src: string }>}
 */
const scripts = [
  {
    name: 'pdfjsLib',
    src: 'https://unpkg.com/pdfjs-dist@2.3.200/build/pdf.min.js',
  },
  {
    name: 'PDFLib',
    src: 'https://unpkg.com/pdf-lib@1.4.0/dist/pdf-lib.min.js',
  },
  {
    name: 'download',
    src: 'https://unpkg.com/downloadjs@1.4.7',
  },
  {
    name: 'makeTextPDF',
    src:
      'https://cdn.jsdelivr.net/gh/snamoah/react-pdf-editor/public/makeTextPDF.js',
  },
  { name: 'w3Color', src: 'https://www.w3schools.com/lib/w3color.js' },
];

/**
 * An object to store the loaded assets.
 * @type {Object}
 */
const assets = {};

/**
 * Retrieves the asset with the given script name.
 * @param {string} scriptName - The name of the script.
 * @returns {Promise} - A promise that resolves to the loaded asset.
 */
export const getAsset = (scriptName) => assets[scriptName];

/**
 * Loads the scripts as assets.
 */
export const prepareAssets = () => {
  if (typeof window !== 'undefined') {
    scripts.forEach(({ name, src }) => {
      assets[name] = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
          resolve(window[name]);
          console.log(`${name} is loaded.`);
        };
        script.onerror = () =>
          reject(`The script ${name} didn't load correctly.`);
        document.body.appendChild(script);
      });
    });
  }
};


export const fonts = {
  Courier: {
        correction(size, lineHeight) {
      return (size * lineHeight - size) / 2 + size / 6;
    },
  },
  Helvetica: {
        correction(size, lineHeight) {
      return (size * lineHeight - size) / 2 + size / 10;
    },
  },
  'Arial': {
        correction(size, lineHeight) {
      return (size * lineHeight - size) / 2 + size / 7;
    },
  },
};

export const Fonts = {
  ...fonts,
};

export const fetchFont = (name) => {
  if (fonts[name]) return fonts[name];

  const font = Fonts[name];
  if (!font) throw new Error(`Font '${name}' not exists.`);

  fonts[name] = fetch(font.src)
    .then((r) => r.arrayBuffer())
    .then((fontBuffer) => {
      const fontFace = new FontFace(name, fontBuffer);
      fontFace.display = 'swap';
      fontFace.load().then(() => document.fonts.add(fontFace));
      return {
        ...font,
        buffer: fontBuffer,
      };
    });
};

/**
 * Initializes the asset preparation process.
 */
(() => {
  prepareAssets();
})();
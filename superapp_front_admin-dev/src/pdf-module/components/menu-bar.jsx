

/**
 * Actions component for the PDF Editor. 
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.uploadNewPdf - The function to handle uploading a new PDF.
 * @param {Function} props.addDrawing - The function to add a drawing to the PDF.
 * @param {Function} props.addText - The function to add text to the PDF.
 * @param {Function} props.addImage - The function to add an image to the PDF.
 * @param {Function} props.addCheckBox - The function to add a checkbox to the PDF.
 * @param {boolean} props.isPdfLoaded - Indicates whether a PDF is loaded.
 * @param {boolean} props.savingPdfStatus - Indicates the status of PDF saving.
 * @param {Function} props.savePdf - The function to save the PDF.
 * @returns {JSX.Element} The rendered MenuBar component.
 */
import React, { useState } from 'react';

const MenuBar = ({
  uploadNewPdf,
  addDrawing,
  addText,
  addImage,
  addCheckBox,
  isPdfLoaded,
  savingPdfStatus,
  savePdf,
}) => {
  const [menuOpened, setMenuOpened] = useState(false);

  const openMenuDropdown = () => {
    setMenuOpened(!menuOpened);
  };

  return (
    <nav className='bg-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex'>
            <div className='flex-shrink-0 flex items-center'>
              <h1 className='text-white'>PDF Editor</h1>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='ml-4 flex items-center md:ml-6'>
              {isPdfLoaded && (
                <div className='relative'>
                  <div className='p-2 bg-gray-800 rounded shadow'>
                    <div className='flex space-x-2'>
                      <div
                        onClick={addCheckBox}
                        className='px-3 py-2 bg-white rounded border border-gray-200 cursor-pointer transition-colors hover:bg-gray-50'
                      >
                        Checkbox
                      </div>
                      <div
                        onClick={addText}
                        className='px-3 py-2 bg-white rounded border border-gray-200 cursor-pointer transition-colors hover:bg-gray-50'
                      >
                        Text
                      </div>
                      <div
                        onClick={addImage}
                        className='px-3 py-2 bg-white rounded border border-gray-200 cursor-pointer transition-colors hover:bg-gray-50'
                      >
                        Image
                      </div>
                      <div
                        onClick={addDrawing}
                        className='px-3 py-2 bg-white rounded border border-gray-200 cursor-pointer transition-colors hover:bg-gray-50'
                      >
                        Drawing
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <button
                data-testid='save-menu-item'
                className='ml-4 px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                disabled={savingPdfStatus}
                onClick={savePdf}
              >
                {savingPdfStatus ? 'Saving...' : 'Save'}
              </button>
              <button
                data-testid='upload-menu-item'
                className='ml-4 px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                onClick={uploadNewPdf}
              >
                Upload New
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { MenuBar };

'use client';
import React, { useEffect, useState } from 'react';
import { useOptionStore } from '@/store/OptionStore';
import {
  BackgroundColor,
  Border,
  Borders,
  FontStyle,
  FontWeights,
  AttachmentTypes,
} from '../entities';
import { useAttachments } from '../hooks/use-attachments';
import { formatString } from '@/app/[lng]/admin/workflows/pdf-innofyre/[workflow_id]/helpers';
import { FontColor } from '@/app/[lng]/admin/workflows/pdf-innofyre/[workflow_id]/constants';

export default function TextOptions({
  updateAttachmentStyles,
  pageAttachments,
  selectedElement,
}) {
  const {
    showOptionPanel,
    setShowOptionPanel,
    setFontWeight,
    fontWeight,
    attachmentType,
  } = useOptionStore((state) => ({
    showOptionPanel: state.showOptionPanel,
    setShowOptionPanel: state.setShowOptionPanel,
    setFontWeight: state.setFontWeight,
    fontWeight: state.fontWeight,
    attachmentType: state.attachmentType,
  }));
  const [selectFontWeight, setSelectedFontWeight] = useState();
  const [selectFontStyle, setSelectedFontStyle] = useState();
  const [selectBackgroundColor, setSelectedBackgroundColor] = useState();
  const [selectBorderStyle, setSelectedBorderStyle] = useState();

  useEffect(() => {
    const selectedAttachment = pageAttachments?.find(
      (element) => element.id === selectedElement
    );

    if (selectedAttachment) {
      const { details } = selectedAttachment;

      if (details) {
        const { fontWeight, fontStyle, backgroundColor, border } = details;

        if (fontWeight !== undefined) {
          setSelectedFontWeight(fontWeight);
        }

        if (fontStyle !== undefined) {
          setSelectedFontStyle(fontStyle);
        }

        if (backgroundColor !== undefined) {
          setSelectedBackgroundColor(backgroundColor);
        }

        if (border !== undefined) {
          setSelectedBorderStyle(border);
        }
      }
    }
  }, [selectedElement, pageAttachments, attachmentType]);

  return (
    <div
      className={`w-full border border-gray-1000 rounded-md p-4 ${
        showOptionPanel ? '' : 'hidden'
      }`}
    >
      <h1 className='text-lg font-semibold mt-1 mb-1'>Properties</h1>
      {attachmentType === AttachmentTypes.TEXT && (
        <div>
          <div className='relative'>
            <select
              className='bg-gray-50 border mb-1 pt-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              value={selectFontWeight}
              onChange={(event) => {
                setSelectedFontWeight(event.target.value);
                updateAttachmentStyles({ fontWeight: event.target.value });
              }}
            >
              {/* <option value='' disabled selected>
                Font Weight
              </option> */}
              {Object.keys(FontWeights).map((weight, index) => (
                <option value={FontWeights[weight]} key={index}>
                  {formatString(weight)}
                </option>
              ))}
            </select>
            <label
              for='floating_filled'
              className='absolute text-sm pl-2 mb-4 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
            >
              Font Weight
            </label>
          </div>

          <div className='relative'>
            <select
              className='bg-gray-50 border mb-1 pt-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              value={selectFontStyle}
              onChange={(event) => {
                updateAttachmentStyles({ fontStyle: event.target.value });
              }}
            >
              {Object.keys(FontStyle).map((style, index) => (
                <option value={FontStyle[style]} key={index}>
                  {formatString(style)}
                </option>
              ))}
            </select>
            <label
              for='floating_filled'
              className='absolute text-sm pl-2 mb-4 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
            >
              Font Style
            </label>
          </div>

          <div className='relative'>
            <select
              className='bg-gray-50 border mb-1 pt-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              value={selectBackgroundColor}
              onChange={(event) => {
                updateAttachmentStyles({
                  backgroundColor: event.target.value,
                  fontColor:
                    event.target.value === BackgroundColor.BLACK
                      ? FontColor.WHITE
                      : FontColor.BLACK,
                });
              }}
            >
              {Object.keys(BackgroundColor).map((color, index) => (
                <option
                  value={BackgroundColor[color]}
                  key={color}
                  // style={{ textTransform: 'lowercase' }}
                >
                  {formatString(color)}
                </option>
              ))}
            </select>
            <label
              for='floating_filled'
              className='absolute text-sm pl-2 mb-4 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
            >
              Background Color
            </label>
          </div>

          <div className='relative'>
            <select
              className='bg-gray-50 border mb-1 pt-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              value={selectBorderStyle}
              onChange={(event) => {
                updateAttachmentStyles({ border: event.target.value });
              }}
            >
              {Object.keys(Borders).map((border, index) => (
                <option value={Borders[border]} key={border}>
                  {formatString(border)}
                </option>
              ))}
            </select>
            <label
              for='floating_filled'
              className='absolute text-sm pl-2 mb-4 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
            >
              Border
            </label>
          </div>
        </div>
      )}

      {attachmentType === AttachmentTypes.IMAGE_STATIC && (
        <div>
          <div className='relative'>
            <select
              className='bg-gray-50 border mb-1 pt-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              value={selectBackgroundColor}
              onChange={(event) => {
                updateAttachmentStyles({ backgroundColor: event.target.value });
              }}
            >
              {Object.keys(BackgroundColor).map((color, index) => (
                <option value={BackgroundColor[color]} key={color}>
                  {formatString(color)}
                </option>
              ))}
            </select>
            <label
              for='floating_filled'
              className='absolute text-sm pl-2 mb-4 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
            >
              Background Color
            </label>
          </div>

          <div className='relative'>
            <select
              className='bg-gray-50 border mb-1 pt-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              value={selectBorderStyle}
              onChange={(event) => {
                updateAttachmentStyles({ border: event.target.value });
              }}
            >
              {Object.keys(Borders).map((border, index) => (
                <option value={Borders[border]} key={border}>
                  {formatString(border)}
                </option>
              ))}
            </select>
            <label
              for='floating_filled'
              className='absolute text-sm pl-2 mb-4 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
            >
              Border
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

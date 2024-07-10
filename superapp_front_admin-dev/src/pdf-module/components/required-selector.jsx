'use client';

import React, { useEffect, useState } from 'react';
import { UserTypes } from '@/pdf-module/entities/index';
import { toast } from 'react-toastify';
import { getResponsiblesUsers } from '@/services/UsersService';
import { useTranslation } from '@/app/i18n';

/**
 * UserSelection component allows users to select and add assignees for a PDF document.
 *
 * @component
 * @param {string} placeholderId - The ID of the placeholder for which assignees are being selected.
 * @param {function} addAssigneeName - The function to add the assignee's name to the PDF document.
 * @param {Array} attachments - The list of attachments for the PDF document.
 * @returns {JSX.Element} UserSelection component
 */

const RequiredSelector = ({
  lng,
  placeholderId,
  updateRequired,
  attachments,
  wf_id,
}) => {
  const [translations, setTranslations] = useState({});
  const [requiredInstruction, setRequiredInstruction] = useState(1);



  //  Set the selected staff
  useEffect(() => {
    const attachment = attachments?.find((att) => att.id === placeholderId);
    if (attachment) {
      setRequiredInstruction(attachment?.required)
    } 
  }, [attachments, placeholderId]);

  useEffect(() => {
    const fetchTranslations = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { t: tw } = await useTranslation(lng, 'workflows');
      setTranslations({
        add_person_in_charge: tw('add_person_in_charge'),
        responsible: tw('responsible'),
        recipients: tw('recipients'),
        select_assignee: tw('select_assignee'),
        required: tw('required'),
        optional: tw('optional')
      })
    };

    fetchTranslations();

    return () => {
      console.log("SignDocument unmounted")
    }
  }, [])



  // Handle change in user type
  const handleCheckChange = (event) => {
    let status = parseInt(event.target.value)
    setRequiredInstruction(status);
    updateRequired(
      placeholderId,
      status,
    );
  };


  return (
    <div className="">
      <ul className=' ml-0 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
        <li className='w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 ml-4'>
          <div className='flex items-center ps-3'>
            <input
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
              id='horizontal-list-radio-required'
              type='radio'
              value={1}
              name='list-radio-required'
              checked={requiredInstruction === 1}
              onChange={handleCheckChange}
            />
            <label
              htmlFor='horizontal-list-radio-required'
              className='w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >{translations.required}</label>
          </div>
        </li>

        <li className='w-full dark:border-gray-600'>
          <div className='flex items-center ps-3'>
            <input
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
              id='horizontal-list-radio-optional'
              type='radio'
              value={0}
              name='list-radio-required'
              checked={requiredInstruction === 0}
              onChange={handleCheckChange}
            />
            <label
              htmlFor='horizontal-list-radio-optional'
              className='w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >{translations.optional}</label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default RequiredSelector;

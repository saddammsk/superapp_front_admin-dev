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

const UserSelection = ({
  lng,
  placeholderId,
  addAssigneeName,
  attachments,
  wf_id,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState(UserTypes.RESPONSIBLES);
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState();
  const [translations, setTranslations] = useState({});

  const [responsibleUsers, setResponsibleUsers] = useState([]); //  Responsible users
  const [dummyDynamicUserData, setDynamicUserData] = useState([
    // Dynamic users
    {
      userId: '${recipient001}',
      value: '${recipient001}',
      label: 'recipient001',
      email: 'recipient001@gmail.com',
      dynamic: true,
    },
  ]);

  // Fetch responsible users
  useEffect(() => {
    const fetchResponsiblesUser = async () => {
      try {
        const responsibleUsersRespond = await getResponsiblesUsers(wf_id);
        setResponsibleUsers(
          responsibleUsersRespond.data.responsibles.responsibles_user
        );
      } catch (error) {
        console.error('Failed to fetch responsibles users:', error);
      }
    };

    fetchResponsiblesUser();
  }, [wf_id]);

  useEffect(() => {
    fetchData();
  }, [userType, dummyDynamicUserData, responsibleUsers]);

  // Add a new dynamic user
  const addUser = () => {
    const newUserNumber = dummyDynamicUserData.length + 1;
    const newUserNumberString = newUserNumber.toString().padStart(3, '0');
    const newUser = {
      userId: `\${recipient${newUserNumberString}}`,
      value: `\${recipient${newUserNumberString}}`,
      label: `recipient${newUserNumberString}`,
      email: `recipient${newUserNumberString}@gmail.com`,
      dynamic: true,
    };
    setDynamicUserData([...dummyDynamicUserData, newUser]);
    setStaffList(dummyDynamicUserData);
    toast.success('Dynamic user added!');
  };

  //  Set the selected staff
  useEffect(() => {
    const attachment = attachments?.find((att) => att.id === placeholderId);
    if (attachment) {
      setSelectedStaff(attachment.userId);
    } else {
      setSelectedStaff();
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
      })
    };

    fetchTranslations();

    return () => {
      console.log("SignDocument unmounted")
    }
  }, [])

  // Fetch data based on user type
  const fetchData = async () => {
    if (userType === UserTypes.RESPONSIBLES) {
      const options = responsibleUsers.map((user) => ({
        value: user?.staff_id,
        label: user?.firstName + ' ' + user.lastName,
        email: user.email,
        userId: user?.staff_id,
      }));
      setStaffList(options);
    } else if (userType === UserTypes.DYNAMIC) {
      setStaffList(dummyDynamicUserData);
    }
  };

  // Handle change in user type
  const handleCheckChange = (event) => {
    if (event?.target?.value != '0') {
      setUserType(event.target.value);
      setStaffList([]);
    }
  };

  // Handle change in selected staff
  const handleSelectChange = (event, id) => {
    if (event?.target?.value != '0') {
      setSelectedStaff({
        [id]: event?.target?.value,
      });
      const assigneePayload = staffList.find(
        (user) => user?.value === event?.target?.value
      );
      addAssigneeName(
        placeholderId,
        assigneePayload.label,
        assigneePayload.userId,
        assigneePayload.dynamic || false
      );
    }
  };

  return (
    <div className="">
      <h3 className='mb-4 font-semibold text-gray-900 dark:text-white flex w-full justify-center bg-white text-sm items-start gap-2 pl-7 pr-6  py-2 h-12 '>
        {/* <svg
          width='14'
          height='17'
          viewBox='0 0 14 17'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          
        </svg> */}
        {translations.add_person_in_charge}
      </h3>
      <ul className=' ml-0 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
        {/* Responsibles Users */}
        <li className='w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 ml-4'>
          <div className='flex items-center ps-3'>
            <input
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
              id='horizontal-list-radio-passport'
              type='radio'
              value={UserTypes.RESPONSIBLES}
              name='list-radio'
              checked={userType === UserTypes.RESPONSIBLES}
              onChange={handleCheckChange}
            />
            <label
              htmlFor='horizontal-list-radio-passport'
              className='w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >{translations.responsible}</label>
          </div>
        </li>

        {/* Dynamic Users */}
        <li className='w-full dark:border-gray-600'>
          <div className='flex items-center ps-3'>
            <input
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
              id='horizontal-list-radio-dynamic'
              type='radio'
              value={UserTypes.DYNAMIC}
              name='list-radio'
              checked={userType === UserTypes.DYNAMIC}
              onChange={handleCheckChange}
            />
            <label
              htmlFor='horizontal-list-radio-dynamic'
              className='w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >{translations.recipients}</label>
          </div>
        </li>
      </ul>

      <div className='flex items-center mt-4'>
        <select
          id='assignUser'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          onChange={(event) => handleSelectChange(event, 'assignUser')}
          value={selectedStaff || ''}
        >
          <option value='0'>{translations.select_assignee}</option>

          {staffList.map((option, index) => (
            <option key={option.value} value={option?.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          onClick={userType === UserTypes.DYNAMIC ? addUser : null}
          // disabled={userType != 'dynamic'}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center ml-4 ${
            userType != UserTypes.DYNAMIC ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <i className='fa fa-user-plus' aria-hidden='true'></i>
        </button>
      </div>
    </div>
  );
};

export default UserSelection;

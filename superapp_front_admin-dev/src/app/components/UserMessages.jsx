import React from 'react'
import Image from 'next/image'
import { jwtDecode } from 'jwt-decode'
import moment from 'moment';
import { getDecodedToken } from '@/utils/utils';

const UserMessage = ({fullName, message, createdDate, userPhoto, senderPhoto, userId, loggedInId }) => {

  const user = getDecodedToken();

  return (
    fullName === user.firstName + " " + user.lastName ?
    <>
      <div className='user-2 mb-14 flex flex-col items-end'>
        <div className='flex gap-2'>
          {/* <Image className=' w-6 h-6 rounded-full' src={senderPhoto} alt="no-img" width={24} height={24} /> */}
          <h3 className='font-semibold md:text-sm text-xs mb-1.5 mt-0.5'>{fullName}</h3>
        </div>
        <div className='flex w-full justify-end items-end gap-4'>
          <p className=' md:text-sm text-xs text-gray-2000'>{moment(createdDate).format('h:mm a')}</p>
          <div className='block w-full max-w-[506px] flex-1 h-auto bg-gray-7000 p-4 rounded-r-lg rounded-b-lg mt-2.5'>
            <p className=' text-black-1000 md:text-sm text-xs'>{message}</p>
          </div>
        </div>
      </div>
    </>
    :
    <>
      <div className={`user-1 mb-4`}>
        <div className='flex gap-2'>
          {/* <Image className=' w-6 h-6 rounded-full' src={userPhoto} alt="no-img" width={24} height={24} /> */}
          <h3 className='font-semibold md:text-sm text-xs mb-1.5 mt-0.5'>{fullName}</h3>
        </div>
        <div className='flex items-end gap-4'>
          <div className='block w-full flex-1 max-w-[506px] h-auto bg-blue-1000 p-4 rounded-r-lg rounded-b-lg mt-2.5'>
            <p className=' text-white md:text-sm text-xs'>{message}</p>
          </div>
          <p className=' md:text-sm text-xs text-gray-2000'>{moment(createdDate).format('h:mm a')}</p>
        </div>
      </div>
    </>


  )
}

export default UserMessage
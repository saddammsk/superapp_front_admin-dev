"use client";

import { Button } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import moment from 'moment'
import { useWorkflowStore } from "@/store/WorkflowStore";
import { shallow } from "zustand/shallow";

export const Header = ({
  setOppenComments,
  deadline,
  users, description,
  status, last_update_date, create_date
}) => {
  const {currentUserInfo} = useWorkflowStore((state) => ({
    currentUserInfo: state.currentUserInfo
  }));

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0
  });

  useEffect(() => {
    if(deadline){
      const updateCountdown = () => {
        const currentDate = moment();
        const objectiveDate = moment(deadline);
        const diff = objectiveDate.diff(currentDate);
        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        if(days<0) days=0;
        if(hours<0) hours=0;
        if(minutes<0) minutes=0;
        setCountdown({ days, hours, minutes });
      };
      updateCountdown();
      const intervalId = setInterval(updateCountdown, 60000);
      return () => clearInterval(intervalId);
    }
  }, [deadline]);

  let expired = countdown.days > 0 || countdown.hours > 0 || countdown.minutes > 0;
  return (
    <>
      <div className="border border-gray-1000 rounded-[10px] p-4 grid md:grid-cols-4 md:gap-0 gap-4 mt-6">
        <div className="flex items-center">
          <div className="flex items-center gap-3">
            {
              users?.map((item)=>{
                return <>
            <Image width={48} height={48} src={item?.image || "/img/default-avatar.jpg"} alt="no-img" />
            <div>
              <h2 className="text-base font-semibold text-black-1000 mb-1">{item?.firstName} {item?.lastName}</h2>
              <p className=" text-sm text-gray-2000">{item?.com_name}</p>
              <p className=" text-sm text-gray-2000 hidden">{description}</p>
            </div>
            </>
              })
            }
          </div>
        </div>
        <div className="flex items-center border-r border-gray-1000">
          
        </div>
        <div className=" pl-6 flex items-center">
          <div className=" flex flex-col justify-start">
            {status === "COMPLETED" ? <>
            <p className={`text-sm text-green-2000`}>Completed</p>
            <p className={`text-base font-semibold mb-1 text-green-2000`}>{moment(last_update_date).format('DD-MM-YYYY hh:mm')}</p>
            </> : <>
            <p className={`text-sm ${expired ? 'text-gray-2000': 'text-red-500'}`}>{expired ? 'Expires in' : 'Expired!'}</p>
            <div className=" flex gap-4 items-center mt-1">
              <div>
                <h3 className={`text-base font-semibold mb-1 ${expired ? 'text-black-1000': 'text-red-500'}`}>{countdown.days || 0}</h3>
                <p className={`text-xs font-medium ${expired ?'text-gray-4000':'text-red-500'}`}>Days</p>
              </div>
              <div>
              <h3 className={`text-base font-semibold mb-1 ${expired ? 'text-black-1000': 'text-red-500'}`}>{countdown.hours || 0}</h3>
              <p className={`text-xs font-medium ${expired ?'text-gray-4000':'text-red-500'}`}>Hours</p>
              </div>
              <div>
              <h3 className={`text-base font-semibold mb-1 ${expired ? 'text-black-1000': 'text-red-500'}`}>{countdown.minutes || 0}</h3>
              <p className={`text-xs font-medium ${expired ?'text-gray-4000':'text-red-500'}`}>Minutes</p>
              </div>
            </div>
            </>
            }
          </div>
        </div>
        <div className="pl-1 flex justify-center items-center border-l border-gray-1000">
        <Button onClick={setOppenComments}>Open Comments</Button>
      </div>
      </div>
    </>
  )
}
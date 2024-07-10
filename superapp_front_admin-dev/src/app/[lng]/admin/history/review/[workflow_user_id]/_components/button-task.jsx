"use client";

import CustomPenIcon from "@/app/components/icons/custom-pen-icon";
import FillFormIcon from "@/app/components/icons/fill-form-icon";
import CheckIcon from "@/app/components/icons/check-icon";
import RejectedIcon from "@/app/components/icons/rejected-icon";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { getAllResponsiblesByWfUserId, getAnswerByBlockId, getParticipantsByWfUserBlockId, getSubmittedDateByWfUserBlockId } from "@/services/WorkflowService";
import moment from "moment";
import { getDecodedToken } from "@/utils/utils";
import { useUserStore } from "@/store/UserStore";

// const StatusBadge = ({ status, text, forceAssigned, statusRejected }) => {

//   let bgColor = "";

//   if (statusRejected == "REJECTED"){
//     if (bgColor == "") {
//       bgColor = 'bg-red-500';
//     }
//   }

//   if (statusRejected == "ToBeCORRECTED"){
//     if (bgColor == "") {
//       bgColor = 'bg-red-500';
//     }
//   }

//   if (forceAssigned) {
//     status = "ASSIGNED";
//   }

//   if (status === "COMPLETED") {
//     if (bgColor == "") {
//       bgColor = 'bg-green-500';
//     }

//   } else if (status === "ASSIGNED") {
//     if (bgColor == "") {
//       bgColor = 'bg-blue-500';
//     }

//   } else if (status === "NOTIFIED") {
//     if (bgColor == "") {
//       bgColor = 'bg-orange-500';
//     }

//   } else if (status === "PENDING") {
//     if (bgColor == "") {
//       bgColor = 'bg-gray-500';
//     }

//   } else if (status === "REJECTED") {
//     if (bgColor == "") {
//       bgColor = 'bg-red-500';
//     }

//   } else if (status === "SUBMITTED") {
//     if (bgColor == "") {
//       bgColor = 'bg-green-500';
//     }

//   }

//   return (
//     <div className={`flex gap-[7px] items-center text-sm font-semibold text-white ${bgColor} rounded-[14px] justify-center w-[54px] h-6`}>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="15"
//         height="16"
//         viewBox="0 0 13 14"
//         fill="none"
//       >
//         <path
//           d="M1.625 11.875V10.7917C1.625 10.217 1.85327 9.66593 2.2596 9.2596C2.66593 8.85327 3.21703 8.625 3.79167 8.625H5.95833C6.53297 8.625 7.08407 8.85327 7.4904 9.2596C7.89673 9.66593 8.125 10.217 8.125 10.7917V11.875M8.66667 2.19535C9.13273 2.31468 9.54581 2.58573 9.8408 2.96577C10.1358 3.34581 10.2959 3.81322 10.2959 4.29431C10.2959 4.7754 10.1358 5.24281 9.8408 5.62285C9.54581 6.00289 9.13273 6.27394 8.66667 6.39327M11.375 11.8749V10.7916C11.3723 10.3134 11.2114 9.84955 10.9174 9.47233C10.6235 9.09512 10.213 8.82574 9.75 8.7062M2.70833 4.29167C2.70833 4.8663 2.93661 5.4174 3.34294 5.82373C3.74926 6.23006 4.30036 6.45833 4.875 6.45833C5.44964 6.45833 6.00074 6.23006 6.40706 5.82373C6.81339 5.4174 7.04167 4.8663 7.04167 4.29167C7.04167 3.71703 6.81339 3.16593 6.40706 2.7596C6.00074 2.35327 5.44964 2.125 4.875 2.125C4.30036 2.125 3.74926 2.35327 3.34294 2.7596C2.93661 3.16593 2.70833 3.71703 2.70833 4.29167Z"
//           stroke="white"
//           strokeWidth="1.33"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//       <span>{text}</span>
//     </div>
//   );
// };

const StatusBadge = ({ status, text, forceAssigned, statusRejected, type, participants, status_document}) => {

  let bgColor = "";

  if (type === "document") {
    if (!forceAssigned) {
      if (participants.filter(item => item.status === "SIGNED").length > 0) {
        bgColor = "bg-completed";
        const statusColors = {
          "COMPLETED": "bg-completed",
          "FILLING": "bg-completed",
          "ASSIGNED": (statusRejected === "ToBeCORRECTED" &&  status_document==='REJECTED') ? "bg-toBeCORRECTED" : (statusRejected === "ToBeCORRECTED" ? "bg-corrected" : "bg-assigned"),
          "NOTIFIED": "bg-toBeCORRECTED",
          "PENDING": "bg-assigned",
          "REJECTED": statusRejected === "ToBeCORRECTED" ? "bg-toBeCORRECTED" : "bg-rejected",
          "CORRECTED": statusRejected === "ToBeCORRECTED" ? "bg-corrected" : "bg-toBeCORRECTED",
          "SUBMITTED": statusRejected === "APPROVED" ? "bg-completed" : (statusRejected === "ToBeCORRECTED" ? 'bg-corrected' : ''),
        };
        if (statusRejected === "REJECTED" && status !== "REJECTED") {
          bgColor = "bg-rejected";
        } else if ((bgColor === "" || bgColor === "bg-completed" ) && statusColors[status]) {
          bgColor = statusColors[status];
        }

      } else {
        bgColor = "bg-assigned";
      }
    } else {
      bgColor = "";
    }
  } else {
    const statusColors = {
      "COMPLETED": "bg-completed",
      "FILLING": "bg-completed",
      "ASSIGNED": "bg-assigned",
      "NOTIFIED": "bg-toBeCORRECTED",
      "PENDING": "bg-assigned",
      "REJECTED": statusRejected === "ToBeCORRECTED" ? "bg-toBeCORRECTED" : "bg-rejected",
      "CORRECTED": statusRejected === "ToBeCORRECTED" ? "bg-corrected" : "bg-toBeCORRECTED",
      "SUBMITTED": statusRejected === "APPROVED" ? "bg-completed" : (statusRejected === "ToBeCORRECTED" ? 'bg-corrected' : ''),
    };

    if (statusRejected === "REJECTED" && status !== "REJECTED") {
      bgColor = "bg-rejected";
    } else if (bgColor === "" && statusColors[status]) {
      bgColor = statusColors[status];
    }
  }

  //Pull A la rama dev

  return (
    <div className={`flex gap-[7px] items-center text-sm font-semibold text-white ${bgColor} rounded-[14px] justify-center w-[54px] h-6`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="16"
        viewBox="0 0 13 14"
        fill="none"
      >
        <path
          d="M1.625 11.875V10.7917C1.625 10.217 1.85327 9.66593 2.2596 9.2596C2.66593 8.85327 3.21703 8.625 3.79167 8.625H5.95833C6.53297 8.625 7.08407 8.85327 7.4904 9.2596C7.89673 9.66593 8.125 10.217 8.125 10.7917V11.875M8.66667 2.19535C9.13273 2.31468 9.54581 2.58573 9.8408 2.96577C10.1358 3.34581 10.2959 3.81322 10.2959 4.29431C10.2959 4.7754 10.1358 5.24281 9.8408 5.62285C9.54581 6.00289 9.13273 6.27394 8.66667 6.39327M11.375 11.8749V10.7916C11.3723 10.3134 11.2114 9.84955 10.9174 9.47233C10.6235 9.09512 10.213 8.82574 9.75 8.7062M2.70833 4.29167C2.70833 4.8663 2.93661 5.4174 3.34294 5.82373C3.74926 6.23006 4.30036 6.45833 4.875 6.45833C5.44964 6.45833 6.00074 6.23006 6.40706 5.82373C6.81339 5.4174 7.04167 4.8663 7.04167 4.29167C7.04167 3.71703 6.81339 3.16593 6.40706 2.7596C6.00074 2.35327 5.44964 2.125 4.875 2.125C4.30036 2.125 3.74926 2.35327 3.34294 2.7596C2.93661 3.16593 2.70833 3.71703 2.70833 4.29167Z"
          stroke="white"
          strokeWidth="1.33"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{text}</span>
    </div>
  );
};

const StatusResponsibles = ({ status, dateSubmitted }) => {
  if (status === "SIGNED" || status === "SUBMITTED") {
    return <h6 class="text-xs group-hover:text-green-1000 font-semibold leading-[160%] text-green-500 ml-2">Completado {moment(dateSubmitted).format("DD/MM/YYYY HH:mm:SS")}</h6>;
  }
  if (status === "PENDING" || status === "NOTIFIED") {
    return <h6 class="text-xs group-hover:text-blue-1000 font-semibold leading-[160%] text-gray-500 ml-2">Pendiente</h6>;
  }
  if (status === "REJECTED") {
    return (
      <>
        <div className="flex">
          <p class="text-xs group-hover:text-red-1000 font-semibold leading-[160%] text-red-500 ml-2">Rechazado {moment(dateSubmitted).format("DD/MM/YYYY HH:mm:SS")}</p>
          <button className="ml-2">
            <svg width="20px" height="20px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 13.6493C3 16.6044 5.41766 19 8.4 19L16.5 19C18.9853 19 21 16.9839 21 14.4969C21 12.6503 19.8893 10.9449 18.3 10.25C18.1317 7.32251 15.684 5 12.6893 5C10.3514 5 8.34694 6.48637 7.5 8.5C4.8 8.9375 3 11.2001 3 13.6493Z" stroke="red" stroke-width="1.008" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          </button>
        </div>
      </>
    );
  }
}

const StatusTask = ({ current_staff_id, participants, currentStatusTask, type, date, status }) => {
  const isAssignedToYou = participants.filter(participant => participant.staff_id === current_staff_id) !== null || (type !== "document" && currentStatusTask !== "SUBMITTED");
  const isAllCompleted = currentStatusTask === "SUBMITTED";
  const isReject = participants.some(participant => participant.status === "REJECTED");
  const isRejectedByYou = participants.some(participant => {
    return participant.staff_id === current_staff_id && participant.status === "REJECTED";
  });

  if (status == "REJECTED") {
    return null
  } else if (status == "ToBeCORRECTED") {
    return null
  } else {


    if (isAllCompleted) {
      return <div>
        <h6 class="text-xs font-semibold leading-[160%] font-dm-sans text-green-500 md:block hidden">Completado</h6>
        {date && <h6 class="text-xs font-semibold leading-[160%] font-dm-sans text-green-500 md:block hidden">{moment(date).format("DD/MM/YYYY HH:mm:SS")}</h6>}
      </div>;
    }
    // if (isAssignedToYou) {
    //   return <p class="text-xs font-semibold leading-[160%] font-dm-sans text-blue-500 md:block hidden">Asignado a ti</p>;
    // }





    if (isReject) {
      return (
        <>
          <div className="flex">
            <p class="text-xs font-semibold leading-[160%] font-dm-sans text-red-500 md:block hidden">Rechazado</p>
            <button className="ml-2">
              <svg width="20px" height="20px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 13.6493C3 16.6044 5.41766 19 8.4 19L16.5 19C18.9853 19 21 16.9839 21 14.4969C21 12.6503 19.8893 10.9449 18.3 10.25C18.1317 7.32251 15.684 5 12.6893 5C10.3514 5 8.34694 6.48637 7.5 8.5C4.8 8.9375 3 11.2001 3 13.6493Z" stroke="red" stroke-width="1.008" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
          </div>
        </>
      );
    }

    if (isRejectedByYou) {
      return (
        <>
          <div className="flex">
            <p class="text-xs font-semibold leading-[160%] font-dm-sans text-red-500 md:block hidden">Rechazado por ti</p>
            <button className="ml-2">
              <svg width="20px" height="20px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 13.6493C3 16.6044 5.41766 19 8.4 19L16.5 19C18.9853 19 21 16.9839 21 14.4969C21 12.6503 19.8893 10.9449 18.3 10.25C18.1317 7.32251 15.684 5 12.6893 5C10.3514 5 8.34694 6.48637 7.5 8.5C4.8 8.9375 3 11.2001 3 13.6493Z" stroke="red" stroke-width="1.008" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
          </div>
        </>
      );
    }

    if (!isAllCompleted) {
      return <h6 class="text-xs font-semibold leading-[160%] font-dm-sans text-black-1000 md:block hidden">Pendiente</h6>;
    }
    return null
  }
}

const StatusRejected = ({ status, date, status_block }) => {


  if (status == "REJECTED" && status_block == "REJECTED") {
    return <div>
      <h6 class="text-xs font-semibold leading-[160%] font-dm-sans text-rejected md:block hidden">Rechazado</h6>
      {date && <h6 class="text-xs font-semibold leading-[160%] font-dm-sans text-rejected md:block hidden">{moment(date).format("DD/MM/YYYY HH:mm:SS")}</h6>}
    </div>;
  }

  if (status == "ToBeCORRECTED" && status_block == "REJECTED") {
    return <div>
      <h6 class="text-xs font-semibold leading-[160%] font-dm-sans text-toBeCORRECTED md:block hidden">Rechazado por Corregir</h6>
      {date && <h6 class="text-xs font-semibold leading-[160%] font-dm-sans text-toBeCORRECTED md:block hidden">{moment(date).format("DD/MM/YYYY HH:mm:SS")}</h6>}
    </div>;
  }
  if (status == "ToBeCORRECTED" && (status_block == "CORRECTED" || status_block == "SUBMITTED")) {
    return <div>
      <h6 class="text-xs font-semibold leading-[160%] font-dm-sans text-corrected md:block hidden">Corregido</h6>
      {date && <h6 class="text-xs font-semibold leading-[160%] font-dm-sans text-corrected md:block hidden">{moment(date).format("DD/MM/YYYY HH:mm:SS")}</h6>}
    </div>;
  }

  return null
}

const getColorByClassname = (className, theme) => {
  if (className.includes("red")) return "#F05252";

  if (className.includes("green")) return "#0E9F6E";

  if (className.startsWith("text-black")) return "#1C1C1C";

  if (theme == "dark") return "#FFFFFF";

  return "#1C1C1C";
};

const RenderIcon = ({ type, className, theme }) => {
  let color = getColorByClassname(className, theme);

  return type === "form" ? (
    <FillFormIcon color={color} />
  ) : (
    <CustomPenIcon color={color} />
  );
};

const RenderPostText = ({ status }) => {
  if (status === "APPROVED") {
    return <CheckIcon />;
  }

  if (status === "REJECTED") {
    return <RejectedIcon />;
  }

  return <></>;
};

const RenderResponsiblesSummary = (responsibles) => {
  if (responsibles.length == 0) {
    return " | ";
  }

  if (responsibles.length == 1) {
    return ` |  ${responsibles[0].firstName} ${responsibles[0].lastName}`;
  }

  return ` |  ${responsibles.reduce((accumulator, currentItem) => {
    if (currentItem.completed === true) {
      return accumulator + 1;
    } else {
      return accumulator;
    }
  }, 0)}/${responsibles.length}`;
};

const RenderImageForBlockType = ({ blockType }) => {
  if (blockType === 'document') {
    return <Image src="/img/block-types/document.svg" alt="" width={30} height={30} />
  }
  if (blockType === 'attachment') {
    return <Image src="/img/block-types/attachment.svg" alt="" width={30} height={30} />
  }
  if (blockType === 'form') {
    return <Image src="/img/block-types/form.svg" alt="" width={30} height={30} />
  }
  if (blockType === 'staticContent') {
    return <Image src="/img/block-types/static.png" alt="" width={30} height={30} />
  }
}

export const ButtonTask = ({
  step,
  isActive,
  onClick,
  task,
  type,
  status,
  status_block,
  revisionStatus,
  theme,
  task_id,
  deadline,
  responsibles,
  wf_user_block_id,
  current_staff_id,
  force
}) => {
  const [activeButton, setActiveButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savedDate, setSavedDate] = useState(null);
  const [participants, setParticipants] = useState([]);
  const currentUser = getDecodedToken();
  const { user, setUser, getUser } = useUserStore((state) => ({
    user: state.user
  }));

  const [actuallyDate, setActuallyDate] = useState(null)

  useEffect(() => {
    getAnswerByBlockId(wf_user_block_id).then((response) => {
      setSavedDate(response.data.data.date)
    }).catch((err) => {
      setSavedDate(null)
    })
  }, [status])

  useEffect(() => {
    if (status === "SUBMITTED") {
      getSubmittedDateByWfUserBlockId(wf_user_block_id).then((response) => {
        setActuallyDate(response)
      }).catch((err) => {
        setActuallyDate(null)
      })
    }
  }, [])

  let statusStyle = `${isActive ? "text-black-1000" : "dark:text-white"}`;

  if (status == "REJECTED" && revisionStatus !== "ToBeCORRECTED") {
    statusStyle = `text-rejected ${isActive ? "dark:text-rejected" : "dark:text-rejected"
    }`;
  }
  else {
    if (status == "SUBMITTED" || status === "FILLING" || status === "REJECTED" || status === "CORRECTED") {
      if (revisionStatus == "REJECTED") {
        statusStyle = `text-rejected ${isActive ? "dark:text-rejected" : "dark:text-rejected"
          }`;
      }
      else if (revisionStatus == "ToBeCORRECTED" && status === "REJECTED") {
        statusStyle = `text-toBeCORRECTED ${isActive ? "dark:text-toBeCORRECTED" : "dark:text-toBeCORRECTED"
          }`;
      }
      else if (revisionStatus == "ToBeCORRECTED" && status === "CORRECTED") {
        statusStyle = `text-corrected ${isActive ? "dark:text-corrected" : "dark:text-corrected"
          }`;
      }
      else if (revisionStatus == "ToBeCORRECTED" && status === "SUBMITTED") {
        statusStyle = `text-corrected ${isActive ? "dark:text-corrected" : "dark:text-corrected"
          }`;
      }
      else {
        statusStyle = `text-completed ${isActive ? "dark:text-completed" : "dark:text-completed"
          }`;
      }
    }
  }

  useEffect(() => {
    fetchParticipants();
  }, [force]);

  const fetchParticipants = async () => {
    setLoading(true);
    try {
      const response = await getParticipantsByWfUserBlockId(wf_user_block_id);
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        const extractedData = response.data.data.map(item => {
          return {
            ...item.metadata,
            date_submited: item.date_submited,
            status: item.status
          }
        });
        setParticipants(extractedData);
      } else {
        setParticipants([]);
      }
    } catch (error) {
      setParticipants([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        class={`flex items-center justify-between w-full py-[11px] px-2 font-medium rtl:text-right text-gray-500 focus:ring-0 ${isActive ? "bg-[#EBF5F0] dark:bg-white dark:text-white" : ""
          }`}>
        <div class="text-start flex items-center" onClick={() => {
          onClick();
        }}>
          <div className="flex justify-between items-center gap-3">
            <div class="text-xs font-semibold text-gray-400 bg-gray-200 border border-gray-200 rounded-[7px] md:w-[54px] w-[23px] h-[23px] flex items-center justify-center">
              <span class={`md:inline-block hidden ${statusStyle}`}>{step}</span>
            </div>
            <div class="border border-gray-1100 rounded-md w-[30px] h-[30px] flex items-center justify-center">
              <RenderImageForBlockType blockType={type} />
            </div>
            <div>
              <h6
                class={`text-xs font-semibold leading-[160%] font-dm-sans text-black-1000 md:block hidden ${statusStyle}`}
              >
                {task}
              </h6>
              {
                /**
                 * <p class="text-xs font-semibold leading-[160%] font-dm-sans text-gray-500 md:block hidden">
                Detail
              </p>
                 */
              }

              <StatusTask current_staff_id={current_staff_id} participants={participants} currentStatusTask={status} type={type} date={actuallyDate} status={revisionStatus} />
              <StatusRejected status={revisionStatus} date={deadline} status_block={status_block} />
            </div>
          </div>
        </div>
        <div class="flex gap-[12px] items-center">
          {/* <StatusBadge status={`${status !== "SUBMITTED" ? participants.some(item => item.staff_id === current_staff_id) ? "ASSIGNED" : status : status}`} forceAssigned={type !== "document" && status !== "SUBMITTED"} text={`${type === "document" ? `${participants.filter(item => item.status === "SIGNED").length}/${participants.length}` : `${status === "SUBMITTED" ? "1/1" : "0/1"}`}`} statusRejected={revisionStatus} /> */}
          <StatusBadge type={type} participants={participants} status={`${status !== "SUBMITTED"  ? participants.some(item => item.staff_id === current_staff_id) ? "ASSIGNED" : status : status}`} status_document={status} forceAssigned={type !== "document" && status !== "SUBMITTED"} text={`${type === "document" ? `${participants.filter(item => item.status === "SIGNED").length}/${participants.length}` : `${(status === "SUBMITTED" || status === "FILLING" || status === "CORECTED") ? "1/1" : "0/1"}`}`} statusRejected={revisionStatus}/>
          <div
            onClick={async () => {
              setActiveButton(!activeButton);
              await fetchParticipants();
            }}
            className={`bg-gray-1000 sm:w-[30px] w-6 sm:h-[30px] h-6 flex items-center justify-center border rounded-md arrow-box ${activeButton ? '-rotate-90 border-blue-3000 text-blue-3000' : 'border-gray-1000 text-gray-1400'}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="#ABACC5"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </button>
      {activeButton && (
        <>
          <div
            id="accordion-collapse-body-1"
            aria-labelledby="accordion-collapse-heading-1"
          >
            <div class="border-t border-blue-500">
              {participants.length > 0 ? (
                participants.map((item, index) => {
                  return (
                    <>
                      <div key={index} class="flex group border-b border-gray-1100 hover:bg-blue-1000/[5%] py-2 px-[20px] cursor-pointer items-center gap-3">
                        <Image
                          src={item.image || "/img/default-avatar"}
                          alt="no-img"
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <div className="flex">
                          <h6 class="text-xs group-hover:text-blue-1000 font-dm-sans leading-[160%] text-greyscale-900">
                            {`${item.firstName} ${item.lastName}`} {current_staff_id == item.staff_id && "(Tú)"}
                          </h6>
                          <StatusResponsibles status={item.status} dateSubmitted={item.date_submited} />
                        </div>
                      </div>
                      {/*<div key={index} class="flex group border-b border-gray-1100 hover:bg-blue-1000/[5%] py-2 px-[20px] cursor-pointer items-center gap-3">
                        <Image
                          src={item.image || "/img/default-avatar"}
                          alt="no-img"
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <div className="flex">
                          <h6 class="text-xs group-hover:text-blue-1000 font-dm-sans leading-[160%] text-greyscale-900">
                            {`${item.firstName} ${item.lastName}`}
                          </h6>
                          <StatusResponsibles status={"PENDING"} />
                        </div>
                      </div>
                      <div key={index} class="flex group border-b border-gray-1100 hover:bg-blue-1000/[5%] py-2 px-[20px] cursor-pointer items-center gap-3">
                        <Image
                          src={item.image || "/img/default-avatar"}
                          alt="no-img"
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <div className="flex">
                          <h6 class="text-xs group-hover:text-blue-1000 font-dm-sans leading-[160%] text-greyscale-900">
                            {`${item.firstName} ${item.lastName}`}
                          </h6>
                          <StatusResponsibles status={"REJECTED"} />
                        </div>
                      </div>*/}
                    </>
                  );
                })
              ) : (
                type === "document" ? <>
                  <div class="flex group border-b border-gray-1100 hover:bg-blue-1000/[5%] py-2 px-[20px] cursor-pointer items-center gap-3">
                    <div className="flex justify-center">
                      <h6 class="text-xs group-hover:text-blue-1000 font-dm-sans leading-[160%] text-greyscale-900">
                        Ningún Participante Encontrado
                      </h6>
                    </div>
                  </div>
                </> : <>
                  <div class="flex group border-b border-gray-1100 hover:bg-blue-1000/[5%] py-2 px-[20px] cursor-pointer items-center gap-3">
                    <Image
                      src={user.image || "/img/default-avatar"}
                      alt="no-img"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <div className="flex">
                      <h6 class="text-xs group-hover:text-blue-1000 font-dm-sans leading-[160%] text-greyscale-900">
                        {`${currentUser.firstName} ${currentUser.lastName}`} {" (Tú)"}
                      </h6>
                      <StatusResponsibles status={status} dateSubmitted={savedDate} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
      <div
        className={`hidden cursor-pointer flex justify-start items-center py-2 px-2 text-xs gap-2 rounded-lg w-full text-black-1000  ${isActive ? "bg-[#EBF5F0] dark:bg-white dark:text-white" : ""
          }`}
      >
        <div className="bg-green-200 border-2 border-green-600 rounded-md p-1">
          <span className="font-bold text-green-600">{step}</span>
        </div>
        <div className="flex flex-1">
          <div
            className={`flex justify-start items-center px-2 text-xs gap-2 rounded-lg w-full text-black-1000  ${isActive ? "bg-[#EBF5F0] dark:bg-white dark:text-white" : ""
              }`}
            onClick={() => {
              onClick();
            }}
          >
            <RenderIcon className={statusStyle} type={type} col theme={theme} />
            <span className={`mr-auto ${statusStyle}`}>{`${task}${activeButton ? RenderResponsiblesSummary(responsibles) : ""
              }`}</span>
            <RenderPostText status={revisionStatus} />
          </div>
          <button
            onClick={() => {
              if (activeButton == false) fetchCurrentUsers();
              if (activeButton == true) setResponsibles([]);
              setActiveButton(!activeButton);
            }}
          >
            <IoIosArrowDown className={`${activeButton && "rotate-180"}`} />
          </button>
        </div>
      </div>
    </>
  );
};

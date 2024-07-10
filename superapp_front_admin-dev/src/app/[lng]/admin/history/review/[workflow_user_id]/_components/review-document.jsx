"use client";

import Image from "next/image";
import { FaDownload, FaEye, FaCheck, FaX } from "react-icons/fa";
import { CgCloseO } from "react-icons/cg";
import { DownloadFileByKey, GetBase64UrlFileByKey } from "@/services/FileManagerService";
import { cn, getFirstPageOfPdfInImage } from "@/utils/utils";
import { Button as FBButton, Modal } from "flowbite-react";

import { Button } from "@/app/components/buttons/button";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import { toast } from "react-toastify";


export const ReviewDocument = ({
  isVerified,
  title,
  value,
  savedValue,
  onAprove,
  onReject,
  setPreview,
  deadLine
}) => {
    let currentLabel = undefined;
    if(value){
      currentLabel = value.reduce((acc, curr) => acc + (acc ? ', ' : '') + curr.name, '');
    } else {
      if(savedValue?.filePath){
        currentLabel = savedValue.filePath
      }
    }
    useEffect(() => {
      const formattedDeadLine = new Date(deadLine).toISOString().slice(0, 16);
      setCurrentDeadLine(formattedDeadLine);
    }, [deadLine]);

    const [isAvailable, setIsAvailable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [base64File, setBase64File] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [rejectedMessage, setRejectedMessage] = useState("");
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [currentDeadLine , setCurrentDeadLine] = useState(null)


    useEffect(()=>{
        if(savedValue?.fileType.includes("image") || savedValue?.fileType.includes("pdf")){
            setLoading(true)
            GetBase64UrlFileByKey(savedValue?.filePath, savedValue?.fileType).then((res)=>{
                if(savedValue?.fileType.includes("image")){
                    setIsAvailable(true)
                    setLoading(false)
                    setBase64File(res)
                }
                if(savedValue?.fileType.includes("pdf")){
                  getFirstPageOfPdfInImage(res).then((response)=>{
                    setIsAvailable(true)
                    setLoading(false)
                    setBase64File(response)
                  })
                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleRejectModal = () => {
      if(rejectedMessage.trim() === ""){
        toast.error("Por favor ingrese un motivo del rechazo")
        setRejectedMessage("");
        return;
      }

      if(!currentDeadLine){
        toast.error("Por favor ingrese una fecha para corregir")
        setCurrentDeadLine(null);
        return;
      }

      let deadlineTimestamp;

        if (currentDeadLine) {
          deadlineTimestamp= new Date(currentDeadLine).getTime() / 1000
        } else {
          const now = new Date();
          now.setSeconds(0, 0);
          deadlineTimestamp = now.getTime() / 1000;
        }

      // onReject(rejectedMessage);
      onReject(rejectedMessage, deadlineTimestamp);
      // onToBeCorrected(currentDeadLine, rejectedMessage);
      setShowModal(false)
    };

    const RenderThumbnail = () =>{
      if(loading){
        return <div className="flex items-center justify-center mb-4"><ClipLoader
        color={'#8049D7'}
        loading={loading}
        cssOverride={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
    /></div>
    }
    if(!isAvailable){
        return <Image
        src="/assets/images/page-img.png"
        alt="no-img"
        width={300}
        height={300}
      />
    }
    if(savedValue?.fileType.includes("image")){
        //Render a image
        return <Image className="cursor-pointer" onClick={()=>{setPreview()}} src={base64File} width={500} height={500} alt='image'/>
    }
    if(savedValue?.fileType.includes("pdf")){
      return <Image className="cursor-pointer" onClick={()=>{setPreview()}} src={base64File} width={225} height={225} alt='image'/>
    }
    return <Image
    src="/assets/images/page-img.png"
    alt="no-img"
    width={300}
    height={300}
  />
    }
  return (
    <>
    <div className="max-w-xs flex flex-col space-y-2">
      <div className="text-sm font-semibold">
        <span>{title}</span>
      </div>
      <div className={cn(
        "bg-gray-200 overflow-hidden rounded-lg relative h-[370px] flex items-center justify-center",
        savedValue?.status == "ACCEPTED" && "ring-1 ring-green-400",
        savedValue?.status == "REJECTED" && "ring-1 ring-red-400"
      )}>
        <RenderThumbnail />
        {savedValue?.status == "ACCEPTED" && (
          <div className="flex items-center text-xs absolute bottom-0 right-0 bg-green-500 text-white py-1 px-2 rounded-tl-lg">
            Verified <FaCheck className="ml-2" />
          </div>
        )}
        {savedValue?.status == "REJECTED" && (
          <div className="flex items-center text-xs absolute bottom-0 right-0 bg-red-500 text-white py-1 px-2 rounded-tl-lg">
            Rejected <CgCloseO className="ml-2" />
          </div>
        )}
        {savedValue?.status == "ToBeCORRECTED" && (
          <div className="flex items-center text-xs absolute bottom-0 right-0 bg-toBeCORRECTED text-white py-1 px-2 rounded-tl-lg">
            To Be Corrected <CgCloseO className="ml-2" />
          </div>
        )}
      </div>
      <div>
        <p className="text-xs text-gray-500">{currentLabel?.includes("/")?currentLabel.match(/\/([^\/]+)$/)[1]: currentLabel}</p>
      </div>
      <div className="flex items-center justify-between bg-gray-100/60 py-2 px-3 rounded-lg hidden">
        <p className="text-sm text-gray-600">Responsible</p>
        <div className="flex items-center gap-3 text-sm font-semibold">
          Daniel Suarez
        </div>
      </div>
      <div className="flex flex-wrap gap-2 justify-between sm:justify-center">
      {
        (savedValue && !value) && <Button className="px-6" onClick={()=>{DownloadFileByKey(savedValue)}}>
        <FaDownload className="mr-2" /> Download
      </Button>
      }
        {
        (savedValue && !value) && <Button onClick={()=>{setPreview()}} className="px-6">
        <FaEye className="mr-2" /> Preview
      </Button>
      }
        
      </div>
      {
        (savedValue?.status === "SUBMITTED" ) && <div className="flex flex-col space-y-2">
        <Button
          variant="success"
          // onClick={onAprove}
          onClick={()=>{
            setOpenConfirmationModal(true)
          }}
        >
          Approve
        </Button>
        <Button onClick={()=>{
          setShowModal(true)
        }}>
          Reject
        </Button>
      </div>
      }

      {
        (savedValue?.status === undefined) ? <div className="flex flex-col space-y-2"><Button>
        Pending to Upload
      </Button></div>:savedValue?.status !== "SUBMITTED" && <div className="flex flex-col space-y-2"><Button
        variant="success"
      >
        Reviewed!
      </Button></div>
      }

    </div>
    <ConfirmationModal isOpen={openConfirmationModal} onClose={() => setOpenConfirmationModal(false)} mnsj="¿Estás seguro?" title="Aprobar" onSubmit={onAprove}/>
    <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header className="capitalize">
          Rechazado con corrección
        </Modal.Header>
        <Modal.Body>
        <div className="grid gap-4 mb-4">
            <div className="flex">
                <label
                  htmlFor="block-key"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Adjunto:
                </label>
                <p className="pl-2">{title}</p>
            </div>
                <div className="grid gap-4 mb-4">
                      <label
                        htmlFor="block-key"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Fecha límite:
                      </label>
                      <input
                        type="datetime-local"
                        id="deadline"
                        value={currentDeadLine}
                        onChange={(e) => setCurrentDeadLine(e.target.value)}
                        className="w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                </div>
                <label
                  htmlFor="block-key"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Motivo de rechazo
                </label>
                <textarea value={rejectedMessage} onChange={(e)=>setRejectedMessage(e.target.value)}/>
                
        </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-between w-full">
            <FBButton
              color="gray"
              onClick={() => setShowModal(false)}
              className="font-medium rounded-lg text-sm me-2 mb-2"
            >
              Cancelar
            </FBButton>
            <FBButton
              onClick={handleRejectModal}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Rechazar
            </FBButton>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}
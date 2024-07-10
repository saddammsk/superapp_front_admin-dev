'use client'
import { Fragment, useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import { GetBase64UrlFileByKey } from '@/services/FileManagerService'
import { Button } from "@/app/components/buttons/button";
import { FaDownload} from "react-icons/fa";
import { DownloadFileByKey } from '../../services/FileManagerService'
import { ClipLoader } from 'react-spinners'

const PreviewPopup = ({filePath, fileType, onHide}) => {

    const [isAvailable, setIsAvailable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [base64File, setBase64File] = useState("");

    useEffect(()=>{
        if(fileType.includes("image") || fileType.includes("pdf")){
            setLoading(true)
            GetBase64UrlFileByKey(filePath, fileType).then((res)=>{
                setBase64File(res)
                setLoading(false)
                if(fileType.includes("image") || fileType.includes("pdf")){
                    setIsAvailable(true)
                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const RenderPreview = () => {
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
            return <div>
                The preview is not posible<Button className="px-6" onClick={()=>{DownloadFileByKey({filePath})}}>
        <FaDownload className="mr-2" /> Download
      </Button>
            </div>
        }
        if(fileType.includes("image")){
            //Render a image
            return <Image src={base64File} width={5000} height={5000} alt='image'/>
        }
        if(fileType.includes("pdf")){
            //Render a image
            return <iframe src={base64File} frameBorder={0} height={600}/>
        }
        return <></>
    }

  return (
    <div className={`fixed w-screen h-screen z-50 top-0 flex justify-center p-6 items-center left-0 bg-transparent`}>
        <div className='w-full h-full absolute top-0 left-0 bg-black-1000 opacity-30'></div>
        <div className='relative w-full max-w-[800px] h-full max-h-[760px] z-50'>
        <div className='w-full bg-white border relative border-gray-1000 h-full rounded-lg md:p-6 p-4'>
              <div className=' absolute top-2 right-6 z-10'>

                <button onClick={onHide} className='items-center gap-4 text-sm font-semibold py-3 mb-3 inline-flex'>
                    <svg width="20" height="20" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 1.5L1 9.5M1 1.5L9 9.5" stroke="#000" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                </button>
              </div>
              <h3 className=' font-semibold mb-6'>Preview of attachment</h3>
              <h3 className=' font-semibold mb-6'>{filePath?.includes("/")?filePath.match(/\/([^\/]+)$/)[1]: filePath}</h3>
              <div className="w-full h-full flex flex-col">
                <RenderPreview />
              </div>
            </div>
        </div>
    </div>
  )
}

export default PreviewPopup;
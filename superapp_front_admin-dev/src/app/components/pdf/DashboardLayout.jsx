'use client';

/**
 * Dashboard layout component for the PDF module.
 *
 * @component
 * @param {string} lng - The language of the component.
 * @param {ReactNode} children - The content to be rendered inside the layout.
 * @param {Array} tools - The list of available tools.
 * @param {Array} documentFields - The list of document fields.
 * @param {function} addText - The function to add text to the document.
 * @param {function} addCheckBox - The function to add a checkbox to the document.
 * @param {function} addImage - The function to add an image to the document.
 * @param {function} addDrawing - The function to add a drawing to the document.
 * @param {function} onFieldSelect - The function to handle field selection.
 * @param {string} placeholderId - The ID of the placeholder element.
 * @param {function} addAssigneeName - The function to add an assignee name.
 * @param {function} handleSaveAttachments - The function to handle saving attachments.
 * @param {Array} attachments - The list of attachments.
 * @param {function} handleImageClick - The function to handle image click.
 * @returns {JSX.Element} The rendered DashboardLayout component.
 */

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TasksList from './TasksList';
import PDFToolbox from './workflow-pdf-toolbox';
import {
  documentFields,
  tools,
} from '@/app/[lng]/admin/workflows/pdf-innofyre/[workflow_id]/constants';
import UserSelection from '@/pdf-module/components/user-selection';
import RequiredSelector from '@/pdf-module/components/required-selector';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import TextOptions from '@/pdf-module/components/text-options';
import { AttachmentTypes } from '@/pdf-module/entities';
import { useOptionStore } from '@/store/OptionStore';
import { useTranslation } from '@/app/i18n';

const DashboardLayout = ({
  lng,
  children,
  tools,
  documentFields,
  addText,
  addCheckBox,
  addImage,
  addDrawing,
  onFieldSelect,
  placeholderId,
  addAssigneeName,
  updateRequired,
  handleSaveAttachments,
  attachments,
  handleImageClick,
  wf_id,
  updateAttachmentStyles,
  updateSelectedElement,
  pageAttachments,
  selectedElement,
  currentWorkflowID
}) => {
  const router = usePathname();
  const { attachmentType } = useOptionStore((state) => ({
    attachmentType: state.attachmentType,
  }));
  const [translations, setTranslations] = useState({});

  /**
   * if the attachment not found no need to show option menu
   */
  const isOptionsVisible = pageAttachments?.find(
    (element) => element.id === selectedElement
  );
  useEffect(() => {

    const fetchTranslations = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { t: tw } = await useTranslation(lng, 'workflows');
      setTranslations({
        home: tw('home'),
        workflow: tw('workflow'),
        submit_instructions: tw('submit_instructions'),
      })
    };

    fetchTranslations();

    return () => {
      console.log("DashboardLayout unmounted")
    }
  }, [])

  return (
    translations && (
      <section className='min-h-screen lg:pb-6 pb-20'>
        <div>
          <div>
            <Breadcrumbs
              items={[
                { text: `${translations.home}`, path: `/${lng}/admin/dashboard/` },
                { text: `${translations.workflow}`, path: `/${lng}/admin/workflows/` },
                { text: `${translations.submit_instructions}`, path: '#' },
              ]}
            />
  
            <div className='mt-4 flex flex-start'>
              <Link
                href='../'
                className='flex items-center text-2xl font-bold justify-center gap-4'
              >
                <span>
                  <svg
                    width='16'
                    height='15'
                    viewBox='0 0 16 15'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M1 7.5H15M1 7.5L7 13.5M1 7.5L7 1.5'
                      stroke='#1C1C1C'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </span>{' '}
                {translations.submit_instructions}
              </Link>
            </div>
          </div>
   {/* <div className=" border border-gray-1000 rounded-[10px] p-4 grid md:grid-cols-3 md:gap-0 gap-4 mt-6">
          <div className=" flex items-center">
            <div className=" flex items-center gap-3">
              <Image
                width={48}
                height={48}
                src="/assets/images/metlife-logo.png"
                alt="no-img"
              />
              <div>
                <h2 className="text-base font-semibold text-black-1000 mb-1">
                  Acquire Insurance
                </h2>
                <p className=" text-sm text-gray-2000">MetLife</p>
              </div>
            </div>
          </div>
          <div className=" border-r border-l border-gray-1000 px-6">
            <div>
              <p className=" text-xs text-gray-2000">Indications</p>
              <div className=" border flex gap-2 items-center border-gray-1000 rounded-md pl-2 pr-3 py-2.5 mt-2">
                <button className="p-1">
                  <svg
                    width="10"
                    height="11"
                    viewBox="0 0 10 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.66667 0.166748H1.33333C0.979711 0.166748 0.640573 0.307224 0.390524 0.557272C0.140476 0.807321 0 1.14646 0 1.50008V9.50008C0 9.8537 0.140476 10.1928 0.390524 10.4429C0.640573 10.6929 0.979711 10.8334 1.33333 10.8334H2.66667C3.02029 10.8334 3.35943 10.6929 3.60948 10.4429C3.85952 10.1928 4 9.8537 4 9.50008V1.50008C4 1.14646 3.85952 0.807321 3.60948 0.557272C3.35943 0.307224 3.02029 0.166748 2.66667 0.166748Z"
                      fill="#359765"
                    />
                    <path
                      d="M8 0.166748H6.66667C6.31304 0.166748 5.97391 0.307224 5.72386 0.557272C5.47381 0.807321 5.33333 1.14646 5.33333 1.50008V9.50008C5.33333 9.8537 5.47381 10.1928 5.72386 10.4429C5.97391 10.6929 6.31304 10.8334 6.66667 10.8334H8C8.35362 10.8334 8.69276 10.6929 8.94281 10.4429C9.19286 10.1928 9.33333 9.8537 9.33333 9.50008V1.50008C9.33333 1.14646 9.19286 0.807321 8.94281 0.557272C8.69276 0.307224 8.35362 0.166748 8 0.166748Z"
                      fill="#359765"
                    />
                  </svg>
                </button>
                <div className=" bg-gray-3000 w-full h-1 relative">
                  <div className="w-1/3 bg-green-1000 h-full"></div>
                </div>
                <div>
                  <p className=" text-gray-2000 text-[10px]">3:32</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" pl-6 flex items-center">
            <div className=" flex flex-col justify-start">
              <p className=" text-sm text-gray-2000">Expires in</p>
              <div className=" flex gap-4 items-center mt-1">
                <div>
                  <h3 className=" text-base font-semibold text-black-1000 mb-1">
                    02
                  </h3>
                  <p className=" text-gray-4000 text-xs font-medium">Days</p>
                </div>
                <div>
                  <h3 className=" text-base font-semibold text-black-1000 mb-1">
                    09
                  </h3>
                  <p className=" text-gray-4000 text-xs font-medium">Hours</p>
                </div>
                <div>
                  <h3 className=" text-base font-semibold text-black-1000 mb-1">
                    20
                  </h3>
                  <p className=" text-gray-4000 text-xs font-medium">Minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
            <div className='w-full mt-6 flex-wrap lg:flex-nowrap flex relative'>
              <div className=' xl:w-3/4 lg:w-2/3 w-full'>{children}</div>

              <div className='rounded-md xl:w-1/4 lg:w-1/3  ml-5'>
                <div className='flex flex-col gap-5'>
                  {/*
               * The UserSelection component is used to render the user selection section.
               * Submit Instraction Button ``handleSaveAttachments`` is used to handle the save attachments.
               */}
                  <button
                    className='flex w-full justify-center bg-green-500 text-white md:text-sm text-xs font-medium items-center gap-2 pl-7 pr-6  py-2 h-12 border border-green-1000 rounded-lg'
                    onClick={handleSaveAttachments}
                  >{translations.submit_instructions}</button>
                  {(attachmentType === AttachmentTypes.IMAGE_STATIC ||
                    attachmentType === AttachmentTypes.TEXT) &&
                    isOptionsVisible && (
                      <TextOptions
                        updateAttachmentStyles={updateAttachmentStyles}
                        pageAttachments={pageAttachments}
                        selectedElement={selectedElement}
                      />
                    )}
                  {/*
               * The UserSelection component is used to render the user selection section.
               * The placeholderId is used to render the placeholder element.
               * The addAssigneeName is used to add an assignee name.
               * The attachments is used to render the attachments.
               */}
                  <UserSelection
                    lng={lng}
                    placeholderId={placeholderId}
                    addAssigneeName={addAssigneeName}
                    attachments={attachments}
                    wf_id={wf_id}
                  />

                  <RequiredSelector
                    lng={lng}
                    placeholderId={placeholderId}
                    updateRequired={updateRequired}
                    attachments={attachments}
                    wf_id={wf_id}
                  />
                  {/*
               * The PDFToolbox component is used to render the PDF toolbox section.
               * The tools is used to render the list of available tools.
               * The documentFields is used to render the list of document fields.
               * The addText is used to add text to the document.
               * The addCheckBox is used to add a checkbox to the document.
               * The addImage is used to add an image to the document.
               * The addDrawing is used to add a drawing to the document.
               * The onFieldSelect is used to handle field selection.
               */}
                  <PDFToolbox
                    tools={tools}
                    documentFields={documentFields}
                    addText={addText}
                    addCheckBox={addCheckBox}
                    addImage={addImage}
                    addDrawing={addDrawing}
                    onFieldSelect={onFieldSelect}
                    currentWorkflowID={currentWorkflowID}
                  />

                  {/*
               * The TasksList component is used to render the tasks list section.
               */}
                  <TasksList />

                  <div className='w-full border border-gray-1000 rounded-md p-4'>
                    <p className=' text-xs text-gray-4000 font-medium mb-4'>
                      Assigned Responsible
                    </p>
                    <ul className='flex flex-col gap-4'>
                      <li>
                        <div className='flex gap-3 justify-between items-center'>
                          <Image
                            src='/assets/images/assigned-img-1.png'
                            alt='no-img'
                            width={24}
                            height={24}
                            className=' rounded-full'
                          />
                          <div className=' mr-auto'>
                            <h4 className=' text-xs font-medium'>Danny Suarez</h4>
                            <p className=' text-xs text-gray-4000'>
                              Confidentiality Agreement
                            </p>
                          </div>
                          <button>
                            <svg
                              width='13'
                              height='13'
                              viewBox='0 0 13 13'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M2.66699 3.66675H2.00033C1.6467 3.66675 1.30756 3.80722 1.05752 4.05727C0.807468 4.30732 0.666992 4.64646 0.666992 5.00008V11.0001C0.666992 11.3537 0.807468 11.6928 1.05752 11.9429C1.30756 12.1929 1.6467 12.3334 2.00033 12.3334H8.00033C8.35395 12.3334 8.69309 12.1929 8.94313 11.9429C9.19318 11.6928 9.33366 11.3537 9.33366 11.0001V10.3334M8.66699 2.33341L10.667 4.33341M11.5903 3.39007C11.8529 3.12751 12.0004 2.77139 12.0004 2.40007C12.0004 2.02875 11.8529 1.67264 11.5903 1.41007C11.3278 1.14751 10.9716 1 10.6003 1C10.229 1 9.87289 1.14751 9.61033 1.41007L4.00033 7.00007V9.00007H6.00033L11.5903 3.39007Z'
                                stroke='#232323'
                                strokeWidth='1.33333'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </svg>
                          </button>
                        </div>
                      </li>

                      <li>
                        <div className='flex gap-3 justify-between items-center'>
                          <Image
                            src='/assets/images/assigned-img-2.png'
                            alt='no-img'
                            width={24}
                            height={24}
                            className=' rounded-full'
                          />
                          <div className=' mr-auto'>
                            <h4 className=' text-xs font-medium'>
                              Anya Tailor Joy
                            </h4>
                            <p className=' text-xs text-gray-4000'>Some Document</p>
                          </div>
                          <button>
                            <svg
                              width='13'
                              height='13'
                              viewBox='0 0 13 13'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M2.66699 3.66675H2.00033C1.6467 3.66675 1.30756 3.80722 1.05752 4.05727C0.807468 4.30732 0.666992 4.64646 0.666992 5.00008V11.0001C0.666992 11.3537 0.807468 11.6928 1.05752 11.9429C1.30756 12.1929 1.6467 12.3334 2.00033 12.3334H8.00033C8.35395 12.3334 8.69309 12.1929 8.94313 11.9429C9.19318 11.6928 9.33366 11.3537 9.33366 11.0001V10.3334M8.66699 2.33341L10.667 4.33341M11.5903 3.39007C11.8529 3.12751 12.0004 2.77139 12.0004 2.40007C12.0004 2.02875 11.8529 1.67264 11.5903 1.41007C11.3278 1.14751 10.9716 1 10.6003 1C10.229 1 9.87289 1.14751 9.61033 1.41007L4.00033 7.00007V9.00007H6.00033L11.5903 3.39007Z'
                                stroke='#232323'
                                strokeWidth='1.33333'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </svg>
                          </button>
                        </div>
                      </li>

                      <li>
                        <div className='flex gap-3 justify-between items-center'>
                          <Image
                            src='/assets/images/assigned-img-2.png'
                            alt='no-img'
                            width={24}
                            height={24}
                            className=' rounded-full'
                          />
                          <div className=' mr-auto'>
                            <h4 className=' text-xs font-medium'>
                              Anya Tailor Joy
                            </h4>
                            <p className=' text-xs text-gray-4000'>
                              Very Other Document
                            </p>
                          </div>
                          <button>
                            <svg
                              width='13'
                              height='13'
                              viewBox='0 0 13 13'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M2.66699 3.66675H2.00033C1.6467 3.66675 1.30756 3.80722 1.05752 4.05727C0.807468 4.30732 0.666992 4.64646 0.666992 5.00008V11.0001C0.666992 11.3537 0.807468 11.6928 1.05752 11.9429C1.30756 12.1929 1.6467 12.3334 2.00033 12.3334H8.00033C8.35395 12.3334 8.69309 12.1929 8.94313 11.9429C9.19318 11.6928 9.33366 11.3537 9.33366 11.0001V10.3334M8.66699 2.33341L10.667 4.33341M11.5903 3.39007C11.8529 3.12751 12.0004 2.77139 12.0004 2.40007C12.0004 2.02875 11.8529 1.67264 11.5903 1.41007C11.3278 1.14751 10.9716 1 10.6003 1C10.229 1 9.87289 1.14751 9.61033 1.41007L4.00033 7.00007V9.00007H6.00033L11.5903 3.39007Z'
                                stroke='#232323'
                                strokeWidth='1.33333'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </svg>
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className='w-full border border-gray-1000 rounded-md p-4'>
                    <p className=' text-xs text-gray-4000 font-medium mb-4'>
                      Instructions
                    </p>
                    <div className=' border flex gap-2 items-center border-gray-1000 rounded-md pl-2 pr-3 py-2.5 mt-2'>
                      <button className='p-1'>
                        <svg
                          width='10'
                          height='11'
                          viewBox='0 0 10 11'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M2.66667 0.166748H1.33333C0.979711 0.166748 0.640573 0.307224 0.390524 0.557272C0.140476 0.807321 0 1.14646 0 1.50008V9.50008C0 9.8537 0.140476 10.1928 0.390524 10.4429C0.640573 10.6929 0.979711 10.8334 1.33333 10.8334H2.66667C3.02029 10.8334 3.35943 10.6929 3.60948 10.4429C3.85952 10.1928 4 9.8537 4 9.50008V1.50008C4 1.14646 3.85952 0.807321 3.60948 0.557272C3.35943 0.307224 3.02029 0.166748 2.66667 0.166748Z'
                            fill='#359765'
                          />
                          <path
                            d='M8 0.166748H6.66667C6.31304 0.166748 5.97391 0.307224 5.72386 0.557272C5.47381 0.807321 5.33333 1.14646 5.33333 1.50008V9.50008C5.33333 9.8537 5.47381 10.1928 5.72386 10.4429C5.97391 10.6929 6.31304 10.8334 6.66667 10.8334H8C8.35362 10.8334 8.69276 10.6929 8.94281 10.4429C9.19286 10.1928 9.33333 9.8537 9.33333 9.50008V1.50008C9.33333 1.14646 9.19286 0.807321 8.94281 0.557272C8.69276 0.307224 8.35362 0.166748 8 0.166748Z'
                            fill='#359765'
                          />
                        </svg>
                      </button>
                      <div className=' bg-gray-3000 w-full h-1 relative'>
                        <div className='w-1/3 bg-green-1000 h-full'></div>
                      </div>
                      <div>
                        <p className=' text-gray-2000 text-[10px]'>3:32</p>
                      </div>
                    </div>
                    <p className=' text-xs text-black-3000 leading-5 mt-4'>
                      Lorem ipsum dolor sit amet consectetur. Feugiat vitae nulla
                      mattis duis viverra. Turpis commodo aliquet enim at a vitae
                      viverra.{' '}
                    </p>
                  </div>

                  <div className='flex lg:flex-col  flex-row-reverse gap-3'>
                    <button className='flex w-full justify-center bg-green-1000 text-white md:text-sm text-xs font-medium items-center gap-2 pl-7 pr-6  py-2 h-12 border border-green-1000 rounded-lg'>
                      Next Document
                    </button>

                    <button className='flex w-full justify-center bg-white md:text-sm text-xs text-black-4000 font-medium items-center gap-2 pl-7 pr-6  py-2 h-12 border border-gray-5000 rounded-lg'>
                      Ready
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>
    )
  );
};

export default DashboardLayout;

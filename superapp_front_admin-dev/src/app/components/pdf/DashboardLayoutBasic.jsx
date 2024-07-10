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
import UserSelectionBasic from '@/pdf-module/components/user-selection-basic';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import TextOptions from '@/pdf-module/components/text-options';
import { AttachmentTypes } from '@/pdf-module/entities';
import { useOptionStore } from '@/store/OptionStore';
import { useTranslation } from '@/app/i18n';

const DashboardLayoutBasic = ({
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
  handleSaveAttachments,
  attachments,
  handleImageClick,
  wf_id,
  updateAttachmentStyles,
  updateSelectedElement,
  pageAttachments,
  selectedElement,
  handleClose
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
                    onClick={handleClose}
                  >Guardar Cambios</button>
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
                  <UserSelectionBasic
                    lng={lng}
                    placeholderId={placeholderId}
                    addAssigneeName={addAssigneeName}
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
                  />

                  {/*
               * The TasksList component is used to render the tasks list section.
               */}
                  
                </div>
              </div>
            </div>
        </div>
      </section>
    )
  );
};

export default DashboardLayoutBasic;

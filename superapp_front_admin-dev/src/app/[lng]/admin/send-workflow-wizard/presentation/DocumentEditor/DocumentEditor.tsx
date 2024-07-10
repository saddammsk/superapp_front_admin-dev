'use client';

/**
 * ApplySign component for displaying and interacting with a PDF document.
 * @component
 * @param {Object} params - The parameters for the component.
 * @param {string} params.lng - The language code.
 * @param {string} params.workflow_id - The ID of the workflow.
 * @returns {JSX.Element} The ApplySign component.
 */

import { useLayoutEffect, useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { uniqueId } from 'lodash';
import { toast } from 'react-toastify';

import DashboardLayoutBasic from '@/app/components/pdf/DashboardLayoutBasic';
import { DrawingModal } from '@/pdf-module/modals/components/drawing-modal';
import { Attachments } from '@/pdf-module/components/attachments';
import { Page } from '@/pdf-module/components/page';
import { usePdf } from '@/pdf-module/hooks/use-pdf';
import ThumbnailView from '@/pdf-module/components/thumbnail-view';
import { useAttachments } from '@/pdf-module/hooks/use-attachments';
import { UploadTypes, useUploader } from '@/pdf-module/hooks/use-uploader';
import { usePdfStatic, fileTypes } from '@/pdf-module/hooks/use-pdf-static';
import {
  AttachmentTypes,
  FontWeights,
  Text,
  BackgroundColor,
  Borders,
  FontStyle,
} from '@/pdf-module/entities';
import { getDecodedToken } from '@/utils/utils';
import {
  createDocumentInstructions,
  getDocumentInstructionsById,
} from '@/pdf-module/utils/rest';
import { getInternalUsers, getExternalUsers } from '@/services/UsersService';

import { placeholderInitialData, documentFields, tools } from './constants';
import { buildPayloadToCreateDocumentInstructions } from './impl';
import { useOptionStore } from '@/store/OptionStore';

interface props {
    lng: string,
    filePath: string,
    instructions: any,
    updateInstructions: (instructions: any)=>void,
    updateResponsibles: (responsibles: any)=>void,
    handleClose: any
}

const DocumentEditor = ({ lng, filePath, instructions, updateInstructions, handleClose, updateResponsibles }: props) => {
  const [drawingModalOpen, setDrawingModalOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [fileDetails, setFileDetails] = useState(null);
  const [placeholderId, setPlaceholderId] = useState();
  const [internalUsers, setInternalUsers] = useState([]);
  const [externalUsers, setExternalUsers] = useState([]);
  const [loading, setLoading] = useState(true)

  const pdfWrapper = useRef();

  const { setAttachmentType } = useOptionStore((state: any) => ({
    setAttachmentType: state.setAttachmentType,
  }));

  /* custom margin adjustment for pdf thumbail view
   * 32px for padding and 24px for gap between loaded middle pdf page to top container
   * this will make the thumbnail view to be in the same height as the pdf viewer
   */
  const customAdjustmentFromPDF = 32 + 24;

  // Gets internal and external users data
  useEffect(() => {
    console.log("OBTENIENDO INTERNAL Y EXTERNAL")
    getInternalAndExternalUsers();
  }, []);

  // Load the pdf file and instructions
  useEffect(() => {
    if (filePath) {
      pdf();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath]);

  // after pdf loading load the instructions
  useEffect(() => {
    updateInstructionsWithUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const {
    add: addAttachment,
    allPageAttachments = [],
    pageAttachments,
    reset: resetAttachments,
    update,
    remove,
    setPageIndex,
    addAssigneeName,
    loadInstructions,
    updateAttachmentStyles,
    updateSelectedElement,
    selectedElement,
  } = useAttachments();


  /*
   * Use the `usePdf` hook to get the necessary functions and data to interact with the PDF.
   */
  const {
    file,
    initialize,
    pageIndex,
    isMultiPage,
    isFirstPage,
    isLastPage,
    currentPage,
    isSaving,
    savePdf,
    goToPage,
    previousPage,
    nextPage,
    setDimensions,
    name,
    dimensions,
    pages,
  } = usePdf();

  /*
   * Use the `useAttachments` hook to get the necessary functions and data to interact with the attachments.
   */
  

  /*
   * Use the `useUploader` hook to get the necessary functions and data to upload files.
   */
  const {
    inputRef: imageInput,
    handleClick: handleImageClick,
    onClick: onImageClick,
    upload: uploadImage,
  } = useUploader({
    use: UploadTypes.IMAGE,
    afterUploadPdf: null,
    afterUploadAttachment: addAttachment,
  });

  /*
   * This is for static pdf, loads pdf file to page using the pdf path in `currentBlockInfo`.
   */
  const { inputRef: pdfInput, staticPdf: pdf } = usePdfStatic({
    use: fileTypes.PDF,
    pdfView: initializePageAndAttachments,
    filePath: filePath,
  });

  /*
   * Use the `useLayoutEffect` hook to update the page index when it changes.
   */
  useLayoutEffect(() => setPageIndex(pageIndex), [pageIndex, setPageIndex]);

  /**
   * Get instructions by Workflow Id
   */

  /**
   * Update instructions with user information.
   */
  const updateInstructionsWithUserInfo = async () => {
    const updatedInstructions = instructions.map(
      (instruction: any) => {
        const { user_id } = instruction;
        let user;

        // CR1 Change
        // Handle Dynamic User flow where user_id is a string in the format `${...}`
        // Extract the user_id from the string and find the user from internal or external users
        // If user_id does not match the pattern `${...}`, find the user from internal or external users
        // Create user_name based on the user object found

        const regex = /\${[^}]+}/; // Comment: move to a const file.
        if (regex.test(user_id)) {
          const userId = user_id.substring(2, user_id.length - 1);
          user = {
            firstName: userId,
            lastName: '',
          };
        } else {
          // Normal flow
          // If user_id does not match the pattern `${...}`, find the user from internal or external users
          user =
            internalUsers.find((user: any) => user.staff_id === user_id) ||
            externalUsers.find((user: any) => user.id === user_id);
            console.log("USERRRRR", user)
        }

        // Create user_name based on the user object found
        const user_name = user
          ? `${user.firstName} ${user.lastName}`
          : 'Assignee Name'; // TODO: Localization support.

        return { ...instruction, user_name };
      }
    );
    loadInstructions(updatedInstructions);
  };

  /**
   * GET internal and external users to fill in dropdowns.
   */
  const getInternalAndExternalUsers = async () => {
    /**
     * TODO: remove this hardcoded id if this flow should take dynamic ids.
     * For now we use hardcoded value.
     */
    const decodedToke = getDecodedToken();
    const id = decodedToke.acc_id;

    /**
     * Order 01: internal users
     * Order 02: external users
     */
    const responses = await Promise.allSettled([
      getInternalUsers(id),
      getExternalUsers(id),
    ]);

    const internalUsers =
      responses[0].status === 'fulfilled' ? responses[0].value.data : [];
    setInternalUsers(internalUsers.data);

    const externalUsers =
      responses[1].status === 'fulfilled' ? responses[1].value.data : [];
    setExternalUsers(externalUsers.data);
    setLoading(false)
  };

  /*
   * Initialize the page and attachments.
   * @param {Object} pdfDetails - The details of the PDF.
   * @returns {void}
   */

  function initializePageAndAttachments(pdfDetails: any) {
    initialize(pdfDetails);
    setFileDetails(pdfDetails);
    const numberOfPages = pdfDetails.pages.length;
    setNumPages(numberOfPages);
    //resetAttachments(numberOfPages);
  }

  // Adds a text attachment to the document
  const addText = () => {
    // Create a new text attachment object
    const newTextAttachment = {
      ...placeholderInitialData[AttachmentTypes.TEXT],
      id: uniqueId(),
      assigneeName: 'Assignee',
      size: Text.SIZE_DEFAULT,
      details: {
        backgroundColor: BackgroundColor.NONE,
        border: Borders.NONE,
        fontStyle: FontStyle.NORMAL,
        fontWeight: FontWeights.NORMAL,
        size: Text.SIZE_DEFAULT,
      },
    };
    addAttachment(newTextAttachment);
    setPlaceholderId(newTextAttachment?.id as any);
    updateSelectedElement(newTextAttachment?.id);
    setAttachmentType(AttachmentTypes.TEXT);
  };

  // Adds a static image attachment to the document
  const addImageStatic = () => {
    const newIMageStaticAttachment = {
      ...placeholderInitialData[AttachmentTypes.IMAGE_STATIC],
      id: uniqueId(),
      assigneeName: 'Assignee',
      details: {
        backgroundColor: BackgroundColor.NONE,
        border: Borders.NONE,
      },
    };

    addAttachment(newIMageStaticAttachment);
    setPlaceholderId(newIMageStaticAttachment?.id as any);
    updateSelectedElement(newIMageStaticAttachment?.id);
    setAttachmentType(AttachmentTypes.IMAGE_STATIC);
  };

  // Adds a static image signature attachment to the document
  const addImageStaticSignature = () => {
    const newImageStaticSignatureAttachment = {
      ...placeholderInitialData[AttachmentTypes.SIGNATURE],
      id: uniqueId(),
      assigneeName: 'Assignee',
      details: {
        backgroundColor: BackgroundColor.NONE,
        border: Borders.NONE,
      },
    };
    addAttachment(newImageStaticSignatureAttachment);
    setPlaceholderId(newImageStaticSignatureAttachment?.id as any);
    updateSelectedElement(newImageStaticSignatureAttachment?.id);
    setAttachmentType(AttachmentTypes.SIGNATURE);
  };

  // Adds a text view attachment to the document
  const addTextView = (key: any, value: any) => {
    const newTextViewAttachment = {
      ...placeholderInitialData[AttachmentTypes.TEXT_VIEW],
      id: uniqueId(),
      text: key,
      value: value,
      assigneeName: 'Assignee',
    };
    addAttachment(newTextViewAttachment);
    setPlaceholderId(newTextViewAttachment?.id as any);
    updateSelectedElement(newTextViewAttachment?.id);
    setAttachmentType(AttachmentTypes.TEXT_VIEW);
  };

  // Adds a checkbox attachment to the document
  const addCheckBox = () => {
    const newCheckboxAttachment = {
      id: uniqueId(),
      ...placeholderInitialData[AttachmentTypes.CHECKBOX],
      assigneeName: 'Assignee',
    };
    addAttachment(newCheckboxAttachment);
    setPlaceholderId(newCheckboxAttachment?.id as any);
    updateSelectedElement(newCheckboxAttachment?.id);
    setAttachmentType(AttachmentTypes.CHECKBOX);
  };

  const addDrawing = (drawing: any) => {
    if (!drawing) return;

    const newDrawingAttachment = {
      id: uniqueId(),
      ...placeholderInitialData.drawing,
      ...drawing,
    };
    addAttachment(newDrawingAttachment);
  };

  /*
   * @returns {JSX.Element} The hidden input fields for PDF and image uploads.
   */
  const hiddenInputs = (
    <>
      <input
        data-testid='pdf-input'
        ref={pdfInput}
        type='file'
        name='pdf'
        id='pdf'
        accept='application/pdf'
        style={{ display: 'none' }}
      />
      <input
        ref={imageInput}
        type='file'
        id='image'
        name='image'
        accept='image/*'
        onClick={onImageClick}
        style={{ display: 'none' }}
        onChange={uploadImage}
      />
    </>
  );

  /**
   * Download pdf with attachments
   * @returns
   */
  const handleSavePdf = () => savePdf(allPageAttachments);

  /*
   * Save attachments to DB
   */
  const handleSaveAttachments = async () => {
    // build the payload needed for thr create document instructions endpoint
    let payload = buildPayloadToCreateDocumentInstructions(
      {
        id: "",
        workflowId: "",
        template_id: "",
        filePath: filePath,
        block_key: "",
        fileType: "",
        type: ""
      },
      allPageAttachments
    ) as any;

    payload.instructions = payload.instructions.map((item: any, index: number) => {
      if (
        item.user_id.startsWith('${recipient') &&
        item.user_id.endsWith('}')
      ) {
        item.dynamic = true;
        item.order = Number(item.user_id.replace('${recipient', '').replace('}', ''))
      } else {
        item.dynamic = false;
      }
      item.id = index
      return item;
    });

    // If payload is null, means there was an error that already handled
    // in `buildPayloadToCreateDocumentInstructions`, exit the function
    if (!payload) return;

    try {
      // create document instruction
      const response = await createDocumentInstructions(payload);
      debugger;
      if (response.status === 201) {
        toast.success('Document instruction created');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to create document instructions');
    }
  };

  if (filePath == null || filePath == undefined) {
    return <></>;
  }

  return <>
  {loading ? <>Loading...</> : <DashboardLayoutBasic
      lng={lng}
      tools={tools}
      documentFields={documentFields}
      addText={addText}
      addCheckBox={addCheckBox}
      addImage={addImageStatic}
      addDrawing={addImageStaticSignature}
      onFieldSelect={addTextView}
      placeholderId={placeholderId}
      addAssigneeName={addAssigneeName}
      handleImageClick={handleImageClick}
      handleSaveAttachments={handleSaveAttachments}
      attachments={pageAttachments}
      wf_id={filePath}
      updateAttachmentStyles={updateAttachmentStyles}
      updateSelectedElement={updateSelectedElement}
      pageAttachments={pageAttachments}
      selectedElement={selectedElement}
      handleClose={()=>{
        let payload = buildPayloadToCreateDocumentInstructions(
          {
            id: "",
            workflowId: "",
            template_id: "",
            filePath: filePath,
            block_key: "",
            fileType: "",
            type: ""
          },
          allPageAttachments
        ) as any;
    
        if(payload !== null){
          payload.instructions = payload.instructions.map((item: any) => {
            if (
              item.user_id.startsWith('${recipient') &&
              item.user_id.endsWith('}')
            ) {
              item.dynamic = true;
              item.order = Number(item.user_id.replace('${recipient', '').replace('}', ''))
            } else {
              item.dynamic = false;
            }
            return item;
          });
          let responsibles: any[] = []
          console.log("INSTRUCTIONS!!", payload)
          payload.instructions.map(
            (instruction: any) => {
              const { user_id } = instruction;
              let user;
      
              // CR1 Change
              // Handle Dynamic User flow where user_id is a string in the format `${...}`
              // Extract the user_id from the string and find the user from internal or external users
              // If user_id does not match the pattern `${...}`, find the user from internal or external users
              // Create user_name based on the user object found
      
              const regex = /\${[^}]+}/; // Comment: move to a const file.
              if (regex.test(user_id)) {
                
              } else {
                // Normal flow
                // If user_id does not match the pattern `${...}`, find the user from internal or external users
                console.log(internalUsers)
                console.log(externalUsers)
                user =
                  internalUsers.find((user: any) => user.staff_id === user_id) ||
                  externalUsers.find((user: any) => user.staff_id === user_id);
                  responsibles.push(user)
              }
            }
          );
          console.log("RESPONSIBLES!!", responsibles)
          updateResponsibles(responsibles)
          updateInstructions(payload.instructions)
          handleClose()
        }
      }}
    >
      <div className='flex w-full'>
        <div className='flex container h-full mx-auto'>
          {hiddenInputs}
          <div className='w-full '>
            <div className='flex h-full gap-5 '>
              <div
                className='p-2 box-content border h-full w-1/4 max-w-[280px] rounded-md overflow-y-auto pt-10 pb-10'
                style={{
                  height: `${(dimensions as any)?.height + customAdjustmentFromPDF}px`,
                }}
              >
                {/*
                 * Thumbnail view
                 */}
                {file && (
                  <ThumbnailView
                    page={pageIndex}
                    pages={pages}
                    goToPage={goToPage}
                    pdfWrapper={pdfWrapper}
                    numPages={numPages}
                    fileDetails={fileDetails}
                  />
                )}
              </div>

              <div className='w-full p-4 border border-gray-1000 rounded-md relative overflow-hidden'>
                {/* viewer */}
                <div className='top-bar'>
                  {/* <div className="page-number"> Page: {currentPage}</div> */}
                </div>

                <div>
                  <div
                    ref={pdfWrapper as any}
                    className='pdf-wrapper w-full h-full max-h-[1095px] overflow-auto documents-overflow '
                  >
                    {!file ? (
                      <p>Loading....</p>
                    ) : (
                      <div className=''>
                        <div className='col-span-6 text-center'>
                          <div className='text-center text-gray-500 group-hover:text-purple-700 transition duration-75 capitalize'>
                            Page {pageIndex + 1} of {pages.length}
                          </div>

                          {currentPage && (
                            <div className='rounded-lg bg-gray-100 p-4'>
                              <div
                                className='relative text-center'
                                style={{
                                  width: `${(dimensions as any)?.width}px`,
                                  height: `${(dimensions as any)?.height}px`,
                                  margin: '0 auto',
                                }}
                              >
                                {/* Page */}
                                <Page
                                  dimensions={dimensions}
                                  updateDimensions={setDimensions}
                                  page={currentPage}
                                />

                                {/* Attachments */}
                                {dimensions && (
                                  <Attachments
                                    pdfName={name}
                                    removeAttachment={remove}
                                    updateAttachment={update}
                                    pageDimensions={dimensions}
                                    attachments={pageAttachments}
                                    placeholderId={placeholderId}
                                    setPlaceholderId={setPlaceholderId}
                                    handleImageClick={handleImageClick}
                                    addSignature={() =>
                                      setDrawingModalOpen(true)
                                    }
                                    updateSelectedElement={
                                      updateSelectedElement
                                    }
                                    selectedElement={selectedElement}
                                    updateAttachmentStyles={null}
                                  />
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* --- END - viewer --- */}

                {/* viewer footer */}
              </div>
              {/* --- END - PDF viewer --- */}
            </div>
          </div>

          {/*  Drawing Modal*/}
          <DrawingModal
            open={drawingModalOpen}
            dismiss={() => setDrawingModalOpen(false)}
            confirm={addDrawing}
            drawing={null as any}
          />
        </div>
      </div>
      {/* <CommentsPopup /> */}
    </DashboardLayoutBasic>}
  </>
};

export default DocumentEditor;

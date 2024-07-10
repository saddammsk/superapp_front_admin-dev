/**
 * Custom hook for managing attachments in a PDF module.
 *
 * @returns {Object} An object containing functions and state variables for managing attachments.
 * @property {Function} add - Adds a new attachment.
 * @property {Function} reset - Resets the attachments to initial state.
 * @property {Function} remove - Removes an attachment.
 * @property {Function} update - Updates an attachment.
 * @property {Function} setPageIndex - Sets the current page index.
 * @property {Array} pageAttachments - An array of attachments for the current page.
 * @property {Array} allPageAttachments - An array of all attachments for each page.
 * @property {Function} addAssigneeName - Adds assignee name to an attachment.
 * @property {Function} loadInstructions - Loads instructions for attachments.
 */
import { useReducer, useCallback } from 'react';
import { uniqueId } from 'lodash';
import {
  AttachmentTypes,
  ImagePlaceHolderUsage,
  Text,
} from '@/pdf-module/entities';
import {
  generateUniqueKey,
  mapInstructionTypeToStaticImage,
  mapUsageByAttachmentType,
} from '@/app/[lng]/admin/workflows/pdf-innofyre/[workflow_id]/helpers';

const ActionType = {
  RESET: 'RESET',
  ADD_ATTACHMENT: 'ADD_ATTACHMENT',
  REMOVE_ATTACHMENT: 'REMOVE_ATTACHMENT',
  UPDATE_ATTACHMENT: 'UPDATE_ATTACHMENT',
  UPDATE_PAGE_INDEX: 'UPDATE_PAGE_INDEX',
  ASSIGN_USER: 'ASSIGN_USER',
  LOAD_INSTRUCTIONS: 'LOAD_INSTRUCTIONS',
  UPDATE_ATTACHMENT_STYLES: 'UPDATE_ATTACHMENT_STYLES',
  UPDATE_SELECTED_ELEMENT: 'UPDATE_SELECTED_ELEMENT',
  UPDATE_REQUIRED: 'UPDATE_REQUIRED'
};

const initialState = {
  pageIndex: -1,
  allPageAttachments: [],
  pageAttachments: [],
  selectedElement: null,
};

const reducer = (state, action) => {
  const { pageIndex, allPageAttachments, pageAttachments, selectedElement } =
    state;

  switch (action.type) {
    case ActionType.ADD_ATTACHMENT: {
      // if page related arrays is not defined add them
      while (allPageAttachments.length <= pageIndex) {
        allPageAttachments.push([]);
      }

      const newAllPageAttachmentsAdd = allPageAttachments.map(
        (attachments, index) => {
          if (pageIndex === index) {
            // introduce `key` for new attachment
            const newAttachment = {
              ...action.attachment,
              instructionKey: generateUniqueKey(action.attachment.type),
              required: 1
            };
            return [...attachments, newAttachment];
          }
          return attachments;
        }
      );

      return {
        ...state,
        allPageAttachments: newAllPageAttachmentsAdd,
        pageAttachments: newAllPageAttachmentsAdd[pageIndex],
      };
    }
    case ActionType.REMOVE_ATTACHMENT: {
      const newAllPageAttachmentsRemove = allPageAttachments.map(
        (otherPageAttachments, index) =>
          pageIndex === index
            ? pageAttachments.filter(
                (_, _attachmentIndex) =>
                  _attachmentIndex !== action.attachmentIndex
              )
            : otherPageAttachments
      );

      // If pageAttachments is empty after filtering, assign an empty array []
      if (pageAttachments.length === 0) {
        newAllPageAttachmentsRemove[pageIndex] = [];
      }

      return {
        ...state,
        allPageAttachments: newAllPageAttachmentsRemove,
        pageAttachments: newAllPageAttachmentsRemove[pageIndex],
      };
    }
    case ActionType.UPDATE_ATTACHMENT: {
      if (pageIndex === -1) {
        return state;
      }

      const newAllPageAttachmentsUpdate = allPageAttachments.map(
        (otherPageAttachments, index) =>
          pageIndex === index
            ? pageAttachments.map((oldAttachment, _attachmentIndex) =>
                _attachmentIndex === action.attachmentIndex
                  ? { ...oldAttachment, ...action.attachment }
                  : oldAttachment
              )
            : otherPageAttachments
      );

      return {
        ...state,
        allPageAttachments: newAllPageAttachmentsUpdate,
        pageAttachments: newAllPageAttachmentsUpdate[pageIndex],
      };
    }
    case ActionType.UPDATE_PAGE_INDEX: {
      return {
        ...state,
        pageIndex: action.pageIndex,
        pageAttachments: allPageAttachments[action.pageIndex],
      };
    }
    case ActionType.RESET: {
      return {
        pageIndex: 0,
        pageAttachments: [],
        allPageAttachments: Array(action.numberOfPages).fill([]),
      };
    }
    case ActionType.ASSIGN_USER: {
      if (!allPageAttachments[pageIndex]) {
        // Return the state as is if allPageAttachments[pageIndex] is undefined or null
        return state;
      }

      const newCurrentPageAttachment = allPageAttachments[pageIndex].map(
        (attachment) => {
          if (attachment.id === action.selectedId) {
            return {
              ...attachment,
              assigneeName: action.assigneeName,
              userId: action.userId,
              dynamic: action.dynamic,
            };
          }
          // Return the attachment object as is if the condition is not met
          return attachment;
        }
      );

      // create a copy of allPageAttachments and update the copy
      const newAllPageAttachments = [...allPageAttachments];
      newAllPageAttachments[pageIndex] = newCurrentPageAttachment;

      return {
        ...state,
        allPageAttachments: newAllPageAttachments,
        pageAttachments: newCurrentPageAttachment,
      };
    }
    case ActionType.UPDATE_REQUIRED: {
      if (!allPageAttachments[pageIndex]) {
        // Return the state as is if allPageAttachments[pageIndex] is undefined or null
        return state;
      }

      const newCurrentPageAttachment = allPageAttachments[pageIndex].map(
        (attachment) => {
          if (attachment.id === action.selectedId) {
            return {
              ...attachment,
              required: action.required
            };
          }
          // Return the attachment object as is if the condition is not met
          return attachment;
        }
      );

      // create a copy of allPageAttachments and update the copy
      const newAllPageAttachments = [...allPageAttachments];
      newAllPageAttachments[pageIndex] = newCurrentPageAttachment;

      return {
        ...state,
        allPageAttachments: newAllPageAttachments,
        pageAttachments: newCurrentPageAttachment,
      };
    }
    case ActionType.LOAD_INSTRUCTIONS: {
      // Result array to hold nested instructions based on page number
      const transformedInstructions = [];

      // Determine the maximum page number
      const maxPageNumber = Math.max(
        ...action.instructions.map((instruction) => instruction.page)
      );

      // Initialize transformedInstructions with empty arrays for each page
      for (let i = 0; i < maxPageNumber; i++) {
        transformedInstructions.push([]);
      }

      action.instructions.forEach((instruction) => {
        const { page } = instruction;
        // Map instruction details to the desired format
        const mappedInstruction = {
          id: instruction.instruction_id,
          instructionKey: instruction.key,
          type: mapInstructionTypeToStaticImage(instruction.type),
          usage: mapUsageByAttachmentType(instruction.type),
          x: instruction.positions.x,
          y: instruction.positions.y,
          width: instruction.dimesions.width,
          height: instruction.dimesions.height,
          showMetadata: instruction.details.showMetadata,
          required: instruction.required ? 1 : 0,
          size: instruction?.size ? instruction?.size : Text.SIZE_DEFAULT,
          disabled: true, //! You need to populate this dynamically, for admin side this is true
          fontFamily: instruction.details.fontFamily,
          text:
            instruction.type === AttachmentTypes.TEXT_VIEW
              ? instruction?.details?.message
              : instruction.type === AttachmentTypes.TEXT
              ? instruction.label === ''
                ? Text.TEXT_DEFAULT
                : instruction.text
              : '',

          assigneeName: instruction.user_name
            ? instruction.user_name
            : 'Assignee Name',
          userId: instruction.user_id,
          placeholderId: uniqueId(),
          details: instruction.details,
        };

        // Push the mapped instruction to the corresponding page in the result array
        transformedInstructions[page - 1].push(mappedInstruction);
      });

      return {
        ...state,
        allPageAttachments: transformedInstructions,
        pageAttachments: transformedInstructions[pageIndex],
      };
    }
    case ActionType.UPDATE_ATTACHMENT_STYLES: {
      if (pageIndex === -1) {
        return state;
      }
      // select the relevant attachment
      const filteredAttachment = pageAttachments.filter(
        (attachments) => attachments.id == state.selectedElement
      );

      if (filteredAttachment[0]) {
        filteredAttachment[0].details = {
          ...filteredAttachment[0]?.details,
          ...action.styles,
        };
      }
      const newAllPageAttachments = pageAttachments.filter(
        (attachments) => attachments.id !== state.selectedElement
      );
      const newPage = [...allPageAttachments];
      newPage[pageIndex] = [...newAllPageAttachments, filteredAttachment[0]];
      return {
        ...state,
        allPageAttachments: newPage,
        pageAttachments: newPage[pageIndex],
      };
    }
    case ActionType.UPDATE_SELECTED_ELEMENT: {
      console.log("ACTUALIZANDO!!!")
      return {
        ...state,
        selectedElement: action.id,
      };
    }
    default: {
      return state;
    }
  }
};

export const useAttachments = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { allPageAttachments, pageAttachments, selectedElement } = state;

  const add = (newAttachment) => {
    dispatch({ type: ActionType.ADD_ATTACHMENT, attachment: newAttachment });
  };

  const remove = (attachmentIndex) =>
    dispatch({ type: ActionType.REMOVE_ATTACHMENT, attachmentIndex });

  const update = (attachmentIndex, attachment) =>{
    dispatch({
      type: ActionType.UPDATE_ATTACHMENT,
      attachmentIndex,
      attachment,
    });
  }

  const reset = (numberOfPages) =>
    dispatch({ type: ActionType.RESET, numberOfPages });

  const setPageIndex = useCallback(
    (index) =>
      dispatch({ type: ActionType.UPDATE_PAGE_INDEX, pageIndex: index }),
    [dispatch]
  );

  const updateRequired = (selectedId, required) => {
    dispatch({
      type: ActionType.UPDATE_REQUIRED,
      selectedId,
      required
    });
  };

  const addAssigneeName = (selectedId, assigneeName, userId, dynamic) => {
    dispatch({
      type: ActionType.ASSIGN_USER,
      selectedId,
      assigneeName,
      userId,
      dynamic,
    });
  };
  const loadInstructions = (instructions = []) => {
    dispatch({
      type: ActionType.LOAD_INSTRUCTIONS,
      instructions,
    });
  };
  const updateAttachmentStyles = (styles) => {
    dispatch({
      type: ActionType.UPDATE_ATTACHMENT_STYLES,
      styles,
    });
  };
  const updateSelectedElement = (id) => {
    dispatch({
      type: ActionType.UPDATE_SELECTED_ELEMENT,
      id,
    });
  };

  return {
    add,
    reset,
    remove,
    update,
    setPageIndex,
    pageAttachments,
    allPageAttachments,
    updateRequired,
    addAssigneeName,
    loadInstructions,
    updateAttachmentStyles,
    updateSelectedElement,
    selectedElement,
  };
};

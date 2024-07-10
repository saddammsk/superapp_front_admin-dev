import { AttachmentTypes, ImagePlaceHolderUsage } from '@/pdf-module/entities';

export const tools = [
  {
    toolName: 'Add Text',
    icon: <i className='fas fa-text-width text-green-500'></i>,
  },
  {
    toolName: 'Add Checkbox',
    icon: <i className='far fa-check-square text-green-500'></i>,
  },
  {
    toolName: 'Add Image',
    icon: <i className='far fa-image text-green-500'></i>,
  },
  {
    toolName: 'Add Signature',
    icon: <i className='far fa-edit text-green-500'></i>,
  },
];

export const documentFields = [
  {
    toolName: 'Initials',
    icon: <i className='far fa-user text-green-500'></i>,
  },
  {
    toolName: 'First Name',
    icon: <i className='fas fa-user text-green-500'></i>,
  },
  {
    toolName: 'Last Name',
    icon: <i className='fas fa-user text-green-500'></i>,
  },
  {
    toolName: 'Age',
    icon: <i className='far fa-clock text-green-500'></i>,
  },
];

export const placeholderInitialData = {
  [AttachmentTypes.TEXT]: {
    type: AttachmentTypes.TEXT,
    x: 100,
    y: 100,
    width: 120,
    height: 25,
    size: 16,
    disabled: true,
    fontFamily: 'Arial',
    text: 'Aa',
  },
  [AttachmentTypes.IMAGE_STATIC]: {
    type: AttachmentTypes.IMAGE_STATIC,
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    usage: ImagePlaceHolderUsage.IMAGE,
  },
  [AttachmentTypes.SIGNATURE]: {
    type: AttachmentTypes.IMAGE_STATIC,
    x: 100,
    y: 100,
    width: 150,
    height: 75,
    usage: ImagePlaceHolderUsage.SIGNATURE,
  },
  [AttachmentTypes.TEXT_VIEW]: {
    type: AttachmentTypes.TEXT_VIEW,
    x: 100,
    y: 100,
    width: 120,
    height: 25,
    size: 16,
    lineHeight: 1.4,
    fontFamily: 'Times-Roman',
  },
  [AttachmentTypes.CHECKBOX]: {
    type: AttachmentTypes.CHECKBOX,
    x: 100,
    y: 100,
    width: 20,
    height: 20,
    size: 16,
    fontFamily: 'Arial',
    text: '',
    disabled: 'disabled',
  },
  drawing: {
    type: AttachmentTypes.DRAWING,
    x: 0,
    y: 0,
    scale: 1,
  },
};

export const FontColor = {
  BLACK: '#000000',
  WHITE: '#FFFFFF',
};

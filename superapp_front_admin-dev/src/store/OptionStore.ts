import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

interface attachmentDetails {
  type: string;
  id: string;
}

export const useOptionStore = createWithEqualityFn()(
  (set) => ({
    showOptionPanel: false,
    attachmmentKey: null,
    fontWeight: 'normal',
    attachmentType: '',
    setAttachmentKey: (value: string) => {
      set((state: string) => ({ attachmmentKey: value }));
    },
    setShowOptionPanel: (value: boolean) => {
      set((state: boolean) => ({ showOptionPanel: value }));
    },
    setFontWeight: (value: string) => {
      console.log('value', value);
      set((state: string) => ({ fontWeight: value }));
    },
    setAttachmentType: (value: attachmentDetails) => {
      set((state: string) => ({ attachmentType: value }));
    },
  }),
  shallow
);

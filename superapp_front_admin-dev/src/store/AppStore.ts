import { create } from 'zustand'
import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'

export const useAppStore = createWithEqualityFn()((set) => ({
    showMobileSidebar: false,
    showMobileMenu: false,
    search: '',
    translations: {},
    setShowMobileSidebar: (value:boolean) => {
        set((state:boolean) => ({ showMobileSidebar: value }))
    },
    setShowMobileMenu: (value:boolean) => {
        set((state:boolean) => ({ showMobileMenu: value }))
    },
    setSearch: (value:string) => {
        set((state:string) => ({ search: value }))
    },
    setTranslations: async (value:any) => {
        set((state:any) => ({ translations: { ...state.translations, ...value } }));
    },
}), shallow)
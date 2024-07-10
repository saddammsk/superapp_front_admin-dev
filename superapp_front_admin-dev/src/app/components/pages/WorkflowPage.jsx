'use client'; // This is a client component 👈🏽

import React, { useEffect } from 'react'
import { useAppStore } from "@/store/AppStore";

export default function WorkflowPage({ translations, children }) {
    const { setTranslations } = useAppStore((state) => ({
        setTranslations: state.setTranslations,
    }));
    useEffect(() => {
        setTranslations(translations)
        return () => {
            console.log('WorkflowPage desmontado');
        };
    }, []);
    return (
        <>{children}</>
    )
}

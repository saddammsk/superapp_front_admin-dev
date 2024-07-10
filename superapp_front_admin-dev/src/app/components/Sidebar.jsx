'use client'; // This is a client component 👈🏽

/* import { useState } from 'react' */
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppStore } from '@/store/AppStore'
import { shallow } from 'zustand/shallow'
import WorkflowModal from '@/app/components/WorkflowModal'

export default function Sidebar({ lng, translations, items }) {    
    const {
        showMobileSidebar,
        setShowMobileSidebar
    } = useAppStore((state) => ({
        showMobileSidebar: state.showMobileSidebar,
        setShowMobileSidebar: state.setShowMobileSidebar
    }));

    const pathname = usePathname()
    return (
        <>
        {/* toggle */}
            <div className={`w-auto z-40 lg:block lg:relative ${showMobileSidebar ? "block absolute" : "hidden"} `}>
                <aside className="sidebar max-h-screen top-0 h-full bg-white text-blue-100 w-60 relative inset-y-0 left-0 transhtmlForm transition duration-200 ease-in-out z-50 md:translate-x-0 md:sticky">
                    <div className="p-2 pt-4 border-b border-r">
                        <WorkflowModal 
                            lng={lng}
                            translations={translations}
                        />
                    </div>
                    <div className="px-4 pt-4 scroller h-screen border-r overflow-hidden">
                        <nav className="">
                            <ul className="flex flex-col space-y-2">
                            {items.map((data, index) => {
                                    return (
                                        <li key={index} className="text-sm text-gray-500 relative">
                                            <Link
                                                href={`/${lng}${data.path}`}
                                                className={`${pathname == "/" + lng + data.path ?
                                                    "font-bold bg-purple-200 flex items-center w-full py-1 px-2 rounded relative hover:text-white hover:bg-purple-200 group" :
                                                    "flex items-center w-full py-1 px-2 rounded relative hover:text-white hover:bg-purple-200 group"}`}
                                            >
                                                <div className="pr-2">
                                                    <i className={`fa-solid fa-${data.icon} text-lg text-gray-500 group-hover:text-purple-700 transition duration-75`}></i>
                                                </div>
                                                <div className="text-gray-500 group-hover:text-purple-700 transition duration-75 capitalize">{data.text}</div>
                                            </Link>
                                            {data.sub_items && (
                                                <ul className="text-sm text-gray-500 relative">
                                                    {data.sub_items.map((subItem, subIndex) => (
                                                        <li key={subIndex} className="text-sm text-gray-500 pl-4">
                                                            <Link
                                                                href={`/${lng}${subItem.path}`}
                                                                className={`${pathname == "/" + lng + subItem.path ?
                                                                    "font-bold bg-purple-200 flex items-center w-full py-1 px-2 rounded relative hover:text-white hover:bg-purple-200" :
                                                                    "flex items-center w-full py-1 px-2 rounded relative hover:text-white hover:bg-purple-200 group"}`}
                                                            >
                                                                <div className="pr-2">
                                                                    <i className={`fa-solid fa-${subItem.icon} text-lg text-gray-500 hover:text-purple-700 transition duration-75`}></i>
                                                                </div>
                                                                <div className="text-gray-500 hover:text-purple-700 transition duration-75 capitalize">{subItem.text}</div>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    )
                                })}

                            </ul>
                        </nav>
                    </div>
                </aside>
            </div>
        </>
    )
}

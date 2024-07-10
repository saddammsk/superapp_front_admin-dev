'use client'; // This is a client component 👈🏽

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { Dropdown } from 'flowbite-react'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { useAppStore } from '@/store/AppStore'
import { useUserStore } from '@/store/UserStore'
import UseDimensions from '@/services/UseDimensions'

const Navbar = ({ lng, translations }) => {
    const { user, setUser, getUser } = useUserStore((state) => ({
        user: state.user,
        setUser: state.setUser,
        getUser: state.getUser
    }));

    const {
        showMobileSidebar,
        setShowMobileSidebar,
        showMobileMenu,
        setShowMobileMenu,
        search,
        setSearch
    } = useAppStore((state) => ({
        showMobileSidebar: state.showMobileSidebar,
        setShowMobileSidebar: state.setShowMobileSidebar,
        showMobileMenu: state.showMobileMenu,
        setShowMobileMenu: state.setShowMobileMenu,
        search: state.search,
        setSearch: state.setSearch
    }));

    const size = UseDimensions()
    const pathname = usePathname();

    const router = useRouter();
    const [showLanguages, setShowLanguages] = useState(false);

    useEffect(() => {
        setShowMobileMenu(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size]);


    useEffect(() => {
        const decodedToken = Cookies.get('decodedToken');
        if (decodedToken && JSON.parse(decodedToken).staff_id) {
            getUser(`:40003/users/getPersonalInfo/${JSON.parse(decodedToken).staff_id}`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChangeLng = (lng) => {
        const elements = pathname.split('/');
        if (elements.length) {
            elements[1] = lng;
            const target = elements.join('/')
            if (pathname !== target) {
                router.push(`${target}`);
            }
        }
    };

    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('decodedToken');
        router.push(`/${lng}/auth/login`);
        setUser(null)
    };

    const renderTrigger = () => (
        <div className="flex justify-center items-center">
            {
                user && (<>
                    <Image width={32} height={32} src={user.image ? user.image : "/img/default-avatar.jpg"} className="w-10 h-10 rounded-full mr-2" alt="Rounded avatar" />
                    <div>
                        {
                            user?.firstName && (
                                <span className='hidden lg:block capitalize'>{user.firstName} {user.lastName}</span>
                            )
                        }
                        {
                            user?.com_name && (
                                <span className='hidden lg:block capitalize text-left font-light text-xs'>{user.com_name}</span>
                            )
                        }
                    </div></>)
            }
            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
        </div>
    )

    return (
        <nav className="md:bg-white bg-purple-500 lg:border-b lg:border-gray-200 sticky w-full top-0 text-black z-40" >
            <div className="mx-auto">
                <div className="flex items-stretch justify-between h-16 w-full">
                    <header className="py-2 px-4 md:block hidden sticky top-0 bg-white z-40">
                        {/* <!-- logo --> */}
                        <a href="#" className="text-white flex items-center space-x-2 group">
                            <div className="min-h-12 flex items-center">
                                <Image
                                    src="/img/logo.png"
                                    width={120}
                                    height={50}
                                    alt="Sidebar logo"
                                />
                            </div>
                        </a>
                    </header>
                    {/* test */}
                    <div className="flex items-center md:hidden">
                        <div className="flex">
                            <button
                                onClick={() => {
                                    setShowMobileSidebar(!showMobileSidebar)
                                    setShowMobileMenu(false)
                                }}
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false">
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>

                                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <header className="py-2 px-4 md:hidden top-0 z-40">
                            {/* <!-- logo --> */}
                            <a href="#" className="text-white flex items-center space-x-2 group">
                                <div className="min-h-12 flex items-center">
                                    <Image
                                        src="/img/logo.png"
                                        width={120}
                                        height={50}
                                        alt="Sidebar logo"
                                    />
                                </div>
                            </a>
                        </header>
                        {/*<div className="hidden lg:block">
                            <div className="app-search">
                                <div className="relative group">
                                    <input
                                        value={search}
                                        onChange={(event) => setSearch(event.target.value)}
                                        type="text"
                                        className="placeholder:capitalize form-input rounded-xl text-sm text-black pl-8 py-1.5 ml-5 border border-purple-200 bg-purple-200 focus:bg-purple-300 outline-none focus:outline-none focus:ring focus:border-purple-500 transition-all duration-300 ease-in-out focus:w-96 w-60 h-[3rem]"
                                        placeholder={`${translations.search}...`}
                                    />
                                    <span className="absolute left-56 top-4 text-black transition-all duration-300 ease-in-out group-focus-within:left-8">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>*/}
                    </div>
                    <div className="hidden md:flex items-stretch">
                        <div className="ml-4 flex md:ml-6 ">
                            <div className="relative flex justify-center items-center mr-4">
                                <div className='ml-2 border-r-2 pr-2'>
                                    50 / 200 Flujos de Trabajo Disponibles
                                </div>
                                {/*<div className="bg-white block cursor-pointer p-1 rounded-full text-gray-400">
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                                    </svg>
                                </div>*/}
                            </div>
                            {
                                user && (
                                    <div className="relative flex justify-center items-center mr-4">
                                        <Dropdown label="" dismissOnClick={false} renderTrigger={renderTrigger} >
                                            <Dropdown.Header className="bg-gray-200 p-2 border-b">
                                                {
                                                    user.firstName && user.lastName && (
                                                        <span className="block text-sm capitalize">{user.firstName} {user.lastName}</span>
                                                    )
                                                }
                                                {
                                                    user.email && (
                                                        <span className="block truncate text-sm font-medium">{user.email}</span>
                                                    )
                                                }
                                                {
                                                    user?.com_name && (
                                                        <span className='hidden lg:block capitalize text-left font-light text-xs'>{user.com_name}</span>
                                                    )
                                                }
                                            </Dropdown.Header>
                                            <Dropdown.Item>
                                                <Dropdown renderTrigger={() => <span className="flex justify-between items-center w-full text-gray-700 capitalize" >
                                                    {translations.languages}
                                                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                                    </svg>
                                                </span>}>
                                                    <Dropdown.Item
                                                        onClick={() => handleChangeLng('es')}
                                                        className={`${lng == 'es' ? 'text-purple-700 bg-purple-200 font-bold capitalize' : 'capitalize'}`}>
                                                        {translations.spanish}
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        onClick={() => handleChangeLng('en')}
                                                        className={`${lng == 'en' ? 'text-purple-700 bg-purple-200 font-bold capitalize' : 'capitalize'}`}>
                                                        {translations.english}
                                                    </Dropdown.Item>
                                                </Dropdown>
                                            </Dropdown.Item>
                                            <Dropdown.Item href={`/${lng}/admin/profile`} className={`${lng == 'en' ? 'text-purple-700 bg-purple-200 font-bold capitalize' : 'capitalize'}`}>
                                                <ProfileIcon
                                                    className="mr-2 h-5 w-5 text-green-400"
                                                    aria-hidden="true"
                                                />
                                                {translations.profile}
                                            </Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item onClick={handleLogout} className="block text-sm text-gray-700 hover:bg-gray-100 w-full text-left capitalize">
                                                {translations.sign_out}
                                            </Dropdown.Item>
                                        </Dropdown>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                    <div className="flex items-center md:hidden">
                        <div className="flex">
                            <button
                                onClick={() => {
                                    setShowMobileSidebar(false)
                                    setShowMobileMenu(!showMobileMenu)
                                }}
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* toggle */}
            <div className={`${showMobileMenu ? "block" : "hidden"} absolute bg-purple-500 w-full`} id="mobile-menu" >
                <div className="pt-4 pb-3">
                    <div className="flex items-center px-5">
                        {
                            user && (<div className="flex-shrink-0">
                                <Image width={32} height={32} src={user.image ? user.image : "/img/default-avatar.jpg"} className="w-10 h-10 rounded-full mr-2" alt="Rounded avatar" />

                            </div>)
                        }
                        <div className="ml-3">
                            {
                                user && (<>
                                    <div className="text-base font-medium leading-none text-white capitalize">{user.firstName} {user.lastName}</div>
                                    <div className="text-sm font-medium leading-none text-white">{user.email}</div>
                                </>)
                            }
                        </div>
                        <button type="button" className="ml-auto flex-shrink-0 p-1 rounded-full text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                        <button onClick={() => setShowLanguages(!showLanguages)} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:yellow-400 w-full text-left">
                            {translations.languages}
                        </button>
                        {
                            showLanguages && (
                                <>
                                    <button
                                        onClick={() => handleChangeLng('es')}
                                        className={`${lng === 'es' ? 'text-yellow-400 font-bold' : 'text-white'} block px-6 py-2 rounded-md text-base hover:text-white w-full text-left`}>
                                        {translations.spanish}
                                    </button>
                                    <button
                                        onClick={() => handleChangeLng('en')}
                                        className={`${lng === 'en' ? 'text-yellow-400 font-bold' : 'text-white'} block px-6 py-2 rounded-md text-base hover:text-white w-full text-left`}>
                                        {translations.english}
                                    </button>
                                </>
                            )
                        }
                        <button onClick={handleLogout} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-yellow-400 w-full text-left">
                            {translations.sign_out}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

function ProfileIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 14 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1 19V17C1 15.9391 1.42143 14.9217 2.17157 14.1716C2.92172 13.4214 3.93913 13 5 13H9C10.0609 13 11.0783 13.4214 11.8284 14.1716C12.5786 14.9217 13 15.9391 13 17V19M3 5C3 6.06087 3.42143 7.07828 4.17157 7.82843C4.92172 8.57857 5.93913 9 7 9C8.06087 9 9.07828 8.57857 9.82843 7.82843C10.5786 7.07828 11 6.06087 11 5C11 3.93913 10.5786 2.92172 9.82843 2.17157C9.07828 1.42143 8.06087 1 7 1C5.93913 1 4.92172 1.42143 4.17157 2.17157C3.42143 2.92172 3 3.93913 3 5Z"
                stroke="#046c4e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
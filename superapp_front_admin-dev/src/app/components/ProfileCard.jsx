'use client'; // This is a client component 👈🏽

import Image from 'next/image'
import { useUserStore } from '@/store/UserStore'

export default function ProfileCard({ lng, translations }) {
    const { user } = useUserStore((state) => ({
        user: state.user,
    }));

    return (
        <>
            {
                user && (
                    <div className="flex flex-col items-center justify-center p-4 gap-6 border rounded-lg w-auto">
                        <div className="w-auto">
                            <Image
                                className="object-cover rounded-full border-2 border-purple-200 p-1"
                                src={user.image ? user.image : "/img/default-avatar.jpg"}
                                alt="profile"
                                width={300}
                                height={300}
                            />
                        </div>
                        <div className="w-auto">
                            <div className="md:flex md:flex-wrap md:items-center mb-4">
                                <h2 className="text-lg lg:text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                                    {user.email}
                                </h2>
                            </div>
                            <ul className="flex justify-center space-x-8 mb-4">
                                {
                                    user?.firstName && user?.lastName && (
                                        <li>
                                            <span className="font-semibold">Name: </span>
                                            <span className="capitalize">{user.firstName} {user.lastName}</span>
                                        </li>
                                    )
                                }
                                {
                                    user?.phone && (
                                        <li>
                                            <span className="font-semibold">Phone: </span>
                                            <span className="capitalize">{user.phone}</span>
                                        </li>
                                    )
                                }
                            </ul>
                            <div className="flex items-center justify-center gap-2">
                                <div>
                                    <Image
                                        className="object-cover rounded-full border-2 p-1"
                                        src={user.com_image ? user.com_image : "/img/default-avatar.jpg"}
                                        alt="profile"
                                        width={50}
                                        height={50}
                                    />
                                </div>
                                <div>
                                    <span className="">
                                        {user.com_name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

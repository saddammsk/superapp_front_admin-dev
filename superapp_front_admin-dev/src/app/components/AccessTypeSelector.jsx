'use client'; // This is a client component 👈🏽

import { useEffect, useState } from 'react';
import { HiInformationCircle } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { Alert } from 'flowbite-react';
import Cookies from 'js-cookie';

const AccessTypeSelector = ({ lng, translations }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const decodedToken = Cookies.get('decodedToken');
        const user = decodedToken ? JSON.parse(decodedToken) : null;
        if (user && user.access_type) {
            router.push(`/${lng}/admin/workflows`, undefined, { shallow: true })
        }
        setUser(user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectAccessType = async (type) => {
        user.access_type = type;
        Cookies.set('decodedToken', JSON.stringify(user), { expires: 14 })
        router.push(`/${lng}/admin/workflows`, undefined, { shallow: true })
    };

    return (
        <>
            <div className="block w-full mb-6">
                <Alert
                    color="info"
                    icon={HiInformationCircle}
                    rounded
                >
                    {translations.you_logged_in} <span className="font-medium">{translations.successfully}.</span>
                </Alert>
            </div>
            <div className="block w-full mb-6">
                <span className="w-full text-xl font-bold mb-6 capitalize">{translations.select_account_type}</span>
                <p className="text-gray-900 whitespace-no-wrap capitalize">{translations.access_account_type}</p>
            </div>
            <div className="w-full flex flex-col md:mx-auto">
                <div className="mb-4 border-s-4 border-blue-400 hover:bg-blue-700 rounded w-full">
                    <button className="flex justify-between items-center hover:text-white bg-transparent text-black uppercase text-sm font-semibold px-4 py-2 text-left w-full"
                        onClick={() => selectAccessType('supplier')}>
                        {translations.access_supplier}
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
                <div className="mb-4 border-s-4 border-green-400 hover:bg-blue-700 rounded w-full">
                    <button className="flex justify-between items-center hover:text-white bg-transparent text-black uppercase text-sm font-semibold px-4 py-2 text-left w-full"
                        onClick={() => selectAccessType('subscriber')}>
                        {translations.access_subscriber}
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </>
    );
};

export default AccessTypeSelector;

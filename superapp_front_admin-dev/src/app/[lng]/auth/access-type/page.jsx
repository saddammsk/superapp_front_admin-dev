
import React from 'react';
import AccessTypeSelector from '@/app/components/AccessTypeSelector';
import { useTranslation } from '@/app/i18n';

export default async function AccessType({ params: { lng } }) {
    const { t: tts } = await useTranslation(lng, 'access-type-selector');
    return (
        <div className="antialiased bg-gray-200 text-gray-900 font-sans ">
            <div className="flex flex-col items-center justify-center h-screen w-full">
                <div className="w-[32rem] bg-white rounded-[40px] py-8 px-10 m-4 md:mx-auto">                    
                    <AccessTypeSelector 
                            lng={lng}
                            translations={{
                                you_logged_in: tts('you_logged_in'),
                                successfully: tts('successfully'),
                                select_account_type: tts('select_account_type'),
                                access_account_type: tts('access_account_type'),
                                access_supplier: tts('access_supplier'),
                                access_subscriber: tts('access_subscriber')
                            }}
                    />
                </div>
            </div>
        </div>
    );
}

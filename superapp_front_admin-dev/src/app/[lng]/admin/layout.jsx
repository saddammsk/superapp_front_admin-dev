import React from 'react'
import Sidebar from '@/app/components/Sidebar'
import Navbar from '@/app/components/navbar'
import AuthMiddleware from '@/app/components/AuthMiddleware'
import { useTranslation } from '@/app/i18n';

export default async function AdminLayout({ children,  params: { lng } }) {
    const { t: tn } = await useTranslation(lng, 'navbar');
    const { t: ts } = await useTranslation(lng, 'sidebar');
    const { t: twf } = await useTranslation(lng, 'workflow-form');
    
    return (
        <>
            <AuthMiddleware>
                <div className="block">
                    <div className="z-40">
                        {/* navbar */}
                        <Navbar
                            lng={lng}
                            translations={{
                                search: tn('search'),
                                languages: tn('languages'),
                                sign_out: tn('sign_out'),
                                spanish: tn('spanish'),
                                english: tn('english'),
                                profile: tn('profile')
                            }}
                        />

                        {/* end of th navbar */}
                    </div>
                    {/* (test) */}
                    <div className="flex md:flex-row flex-col h-full z-40">
                        {/* <!-- Sidebar --> */}
                        <Sidebar 
                            lng={lng}
                            translations={{
                                start: ts('start'),
                                add_workflow: twf('add_workflow'),
                                send_workflow: twf('send_workflow'),
                                emission_name: twf('emission_name'),
                                workflow: twf('workflow'),
                                recipient: twf('recipient'),
                                responsible: twf('responsible'),
                                select: twf('select'), 
                                deadline: twf('deadline'), 
                                days: twf('days'), 
                                hours: twf('hours'), 
                                cancel: twf('cancel'),
                                internal_users: twf('internal_users'),
                                external_users: twf('external_users'),
                                send_workflow_template: twf('send_workflow_template'),
                                send_workflow_previously_configured: twf('send_workflow_previously_configured'),
                                send_new_workflow: twf('send_new_workflow'),
                                send_new_workflow_with_assistant: twf('send_new_workflow_with_assistant'),
                            }}
                            items={[
                                { text: ts('dashboard'), icon: 'house', path: '/admin/dashboard' },
                                //{ text: ts('profile'), icon: 'user', path: '/admin/profile' },
                                { text: ts('templates'), icon: 'id-card', path: '/admin/templates' },
                                { text: ts('workflows'), icon: 'bars-staggered', path: '/admin/workflows' },
                                { text: ts('directory'), icon: 'sitemap', path: '/admin/directory' },
                                { text: ts('team'), icon: 'users', path: '/admin/team' },
                                { text: ts('history'), icon: 'history', path: '/admin/history' },
                                //{ text: ts('messages'), icon: 'message', path: '/admin/messages' },
                                { text: ts('settings'), icon: 'cog', path: '/admin/settings', sub_items: [
                                    { text: ts('dynamic_parameters'), icon: 'screwdriver', path: '/admin/dynamic-parameters' },
                                    { text: ts('roles_permissions'), icon: 'user-tie', path: '/admin/roles-permissions' }
                                ]},
                            ]}
                        />
                        {/* <!-- End of the Sidebar --> */}
                        <div className="py-4 lg:px-8 w-full p-6 overflow-x-auto">
                            {children}
                        </div>
                    </div>
                </div>
            </AuthMiddleware>
        </>
    )
}

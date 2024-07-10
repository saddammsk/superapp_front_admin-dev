import { useTranslation } from '@/app/i18n'
import TeamCardsContainer from '@/app/components/TeamCardsContainer'
import TeamTable from '@/app/components/TeamTable'




export default async function Team({ params: { lng } }) {
    const { t : ta } = await useTranslation(lng, 'app');  
    const { t : tt } = await useTranslation(lng, 'team'); 

    return (
        <>
            <div className="container mx-auto">
                <div>
                    <h2 className="text-2xl font-semibold leading-tight">{ta('team')}</h2>
                </div>
                {/* <TeamCardsContainer 
                    translations={{
                      technology_group: tt('technology_group'),
                      developers_group: tt('developers_group'),
                      create_staff: tt('create_staff'),
                      first_name: tt('first_name'),
                      last_name: tt('last_name'),
                      email: tt('email'),
                      email_b: tt('email_b'),
                      phone: tt('phone'),
                      cancel: ta('cancel'),
                      create: ta('create'),
                      edit: ta('edit'),
                      update: ta('update'),
                      delete: ta('delete'),
                      team: ta('team')
                    }}
                /> */}
            </div>
            <div>
            <TeamTable />
            </div>
        </>
    )
}

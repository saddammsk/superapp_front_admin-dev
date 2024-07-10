import { useTranslation } from '@/app/i18n'
import DirectoryTable from '@/app/components/DirectoryTable'

export default async function Directory({ params: { lng } }) {
    const { t : ta } = await useTranslation(lng, 'app');  
    const { t : td } = await useTranslation(lng, 'directory');   

    return (
        <>
            <div className="container mx-auto">
                <div>
                    <h2 className="text-2xl font-semibold leading-tight">{ta('directory')}</h2>
                </div>
                <DirectoryTable 
                    headers={[
                      td('company'),
                      td('type_documento'),
                      ta('identity_document'),
                      td('name'),
                      td('email'),
                      td('phone'),
                      // td('metadata'),
                      td('action'),
                    ]}
                    translations={{
                      id_label: ta('identity_document'),
                      type_documento: td('type_documento'),
                      directory: ta('directory'),
                      internal_users: td('internal_users'),
                      external_users: td('external_users'),
                      create_staff: td('create_staff'),
                      view_metadata: td('view_metadata'),
                      name: td('name'),
                      first_name: td('first_name'),
                      last_name: td('last_name'),
                      email: td('email'),
                      phone: td('phone'),
                      company: td('company'),
                      cancel: ta('cancel'),
                      create: ta('create'),
                      edit: ta('edit'),
                      update: ta('update'),
                      delete: ta('delete'),
                      metadata:td('metadata'),
                      previous:td('previous'),
                      next:td('next')
                    }}
                  />
            </div>
        </>
    )
}

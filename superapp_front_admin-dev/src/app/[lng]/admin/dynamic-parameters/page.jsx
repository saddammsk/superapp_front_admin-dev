import { useTranslation } from '@/app/i18n'
import DynamicParamsTable from '@/app/components/DynamicParamsTable'

export default async function Directory({ params: { lng } }) {
    const { t : ta } = await useTranslation(lng, 'app');  
    const { t : tda } = await useTranslation(lng, 'dynamic-parameters');   

    return (
        <>
            <div className="container mx-auto">
                <div>
                    <h2 className="text-2xl font-semibold leading-tight">{tda('dynamic_parameters')}</h2>
                </div>
                <DynamicParamsTable 
                    headers={[
                      tda('company'),
                      tda('type_documento'),
                      ta('identity_document'),
                      tda('name'),
                      tda('email'),
                      tda('phone'),
                      // tda('metadata'),
                      tda('action'),
                    ]}
                    translations={{
                      id_label: ta('identity_document'),
                      type_documento: tda('type_documento'),
                      directory: ta('directory'),
                      internal_users: tda('internal_users'),
                      external_users: tda('external_users'),
                      create_staff: tda('create_staff'),
                      view_metadata: tda('view_metadata'),
                      name: tda('name'),
                      first_name: tda('first_name'),
                      last_name: tda('last_name'),
                      email: tda('email'),
                      phone: tda('phone'),
                      company: tda('company'),
                      cancel: ta('cancel'),
                      create: ta('create'),
                      import:ta('import'),
                      edit: ta('edit'),
                      update: ta('update'),
                      delete: ta('delete'),
                      metadata:tda('metadata'),
                      previous:tda('previous'),
                      next:tda('next'),
                      label: tda("label"),
                      key: tda("key"),
                      type: tda("type"),
                      default_value: tda("default_value"),
                      value: tda("value"),
                      action: tda('action'),
                      create_param: tda('create_param')
                    }}
                  />
            </div>
        </>
    )
}

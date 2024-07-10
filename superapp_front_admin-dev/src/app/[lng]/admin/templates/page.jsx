import { useTranslation } from '@/app/i18n'
import TemplateCardsContainer from '@/app/components/TemplateCardsContainer'

export default async function Templates({ params: { lng } }) {
  const { t: ta } = await useTranslation(lng, 'app');
  const { t : tt } = await useTranslation(lng, 'template'); 
  return (
    <>
      <div className="container mx-auto">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">{ta('templates')}</h2>
        </div>
        <TemplateCardsContainer
          translations={{
            create_template: tt('create_template'),
            template_name: tt('template_name'),
            cancel: ta('cancel'),
            create: ta('create'),
            edit: ta('edit'),
            update: ta('update'),
            delete: ta('delete'),
            templates: ta('templates')
          }}
        />
      </div>
    </>
  )
}
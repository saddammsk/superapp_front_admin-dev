import { useTranslation } from '@/app/i18n'
import ProfileCard from '@/app/components/ProfileCard'

export default async function Profile({ params: { lng } }) {
  const { t: tf } = await useTranslation(lng, 'profile');
  return (
    <>
      <section className="">
        <div className="container mx-auto">
          <ProfileCard
            lng={lng}
            translations={{
              test: tf('test'),
            }}
          />
        </div>
      </section>
    </>
  )
}
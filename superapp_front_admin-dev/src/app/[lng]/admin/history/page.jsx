import { useTranslation } from '@/app/i18n'
import WorkflowsTable from '@/app/components/WorkflowsTable'

export default async function History({ params: { lng } }) {
    const { t : ta } = await useTranslation(lng, 'app');  
    const { t : th } = await useTranslation(lng, 'history');   

    return (
        <>
            <div className="container mx-auto">
                <div>
                    <h2 className="text-2xl font-semibold leading-tight">{ta('history')}</h2>
                </div>
                <WorkflowsTable 
                    lng={lng}
                    headers={[
                        th('emmision_name'),
                        th('workflows'),
                        th('recipients'),
                        th('identity_document'),
                        th('time_elapsed'),
                        th('status'),
                        th('progress'),
                        th('action'),
                    ]}
                    translations={{
                        non_existent_staff:th('non_existent_staff'),
                        previous:th('previous'),
                        next:th('next'),
                        COMPLETED:th('completed'),
                        INPROCESS:th('inprocess'),
                        PENDING:th('pending'),
                        SUBMITTED:th('submitted'),
                        REJECTED:th('rejected'),
                        TOBECORRECTED:th('tobecorrected'),
                        CORRECTED:th('corrected'),
                        staff_id:th('staff_id'),
                        time_elapsed:th('time_elapsed'),
                        status:th('status'),
                        progress:th('progress'),
                        workflows:th('workflows'),
                        action:th('action'),
                        emmision_name:th('emmision_name'),
                        recipients:th('recipients'),
                        identity_document:th('identity_document'),
                    }}
                />
            </div>
        </>
    )
}

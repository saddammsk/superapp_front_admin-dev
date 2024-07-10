import Link from 'next/link'
import Breadcrumbs from '@/app/components/Breadcrumbs'

export const Navbar = ({ lng }) => {
  return (
    <div>
      <Breadcrumbs items={[
        {text: 'History', path: `/${lng}/admin/history`},
        {text: 'Review', path: `#`},
      ]}/>
      <div className="mt-4 flex justify-start">
        <Link href="../" className="flex items-center text-2xl font-bold justify-center gap-4">
          <span><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7.5H15M1 7.5L7 13.5M1 7.5L7 1.5" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          </span> Review a Document
        </Link>
      </div>
    </div>
  )
}
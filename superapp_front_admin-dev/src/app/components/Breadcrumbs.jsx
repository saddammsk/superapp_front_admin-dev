
import Link from 'next/link'

export default function Breadcrumbs({ items }) {
    return (
        <>
            <ul className="flex lg:gap-3 gap-2">
                {
                    items.map((data, index) => (
                        <li key={index} className="flex gap-3">
                            <Link
                                href={data.path}
                                className={
                                    index < items.length - 1 ?
                                        "lg:text-sm text-[10px] text-gray-2000" :
                                        "lg:text-sm text-[10px] text-green-1000 dark:text-white"
                                }>
                                {data.text}
                            </Link>
                            {
                                index < items.length - 1 && (
                                    <span className="lg:text-sm text-[10px] text-gray-2000" >/</span>
                                )
                            }
                        </li>
                    ))
                }
            </ul>
        </>
    )
}
